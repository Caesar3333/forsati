"""Split each still into a background plate + feathered foreground cutout for 2.5D parallax.
Depth: Depth Anything V2 (small, ONNX). Usage: make_layers.py <model.onnx> <out_dir> <img>..."""
import sys, os, numpy as np, cv2, onnxruntime as ort
model, out = sys.argv[1], sys.argv[2]
sess = ort.InferenceSession(model)
W, H = 1080, 1920
def cover(img):
    h, w = img.shape[:2]; s = max(W / w, H / h)
    img = cv2.resize(img, (round(w * s), round(h * s)), interpolation=cv2.INTER_LANCZOS4)
    y, x = (img.shape[0] - H) // 2, (img.shape[1] - W) // 2
    return img[y:y + H, x:x + W]
for path in sys.argv[3:]:
    name = os.path.splitext(os.path.basename(path))[0]
    img = cover(cv2.imread(path))
    x = cv2.resize(cv2.cvtColor(img, cv2.COLOR_BGR2RGB), (518, 518)).astype(np.float32) / 255
    x = ((x - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]).transpose(2, 0, 1)[None].astype(np.float32)
    d = sess.run(None, {sess.get_inputs()[0].name: x})[0][0]
    d = cv2.resize((d - d.min()) / (d.max() - d.min() + 1e-6), (W, H), interpolation=cv2.INTER_CUBIC)
    # foreground = nearest region (Otsu on depth), cleaned and feathered
    d8 = (d * 255).astype(np.uint8)
    _, m = cv2.threshold(d8, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((9, 9), np.uint8))
    n, lab, stats, _ = cv2.connectedComponentsWithStats(m)
    keep = [i for i in range(1, n) if stats[i, cv2.CC_STAT_AREA] > 0.01 * W * H]
    m = np.isin(lab, keep).astype(np.uint8) * 255
    alpha = cv2.GaussianBlur(m, (0, 0), 6)
    # background plate: inpaint a dilated mask at half resolution, paste back inside the mask only
    big = cv2.dilate(m, np.ones((41, 41), np.uint8))
    small = cv2.inpaint(cv2.resize(img, (W // 2, H // 2)), cv2.resize(big, (W // 2, H // 2)), 12, cv2.INPAINT_TELEA)
    fill = cv2.GaussianBlur(cv2.resize(small, (W, H)), (0, 0), 3)
    k = (cv2.GaussianBlur(big, (0, 0), 8) / 255.0)[..., None]
    bg = (img * (1 - k) + fill * k).astype(np.uint8)
    cv2.imwrite(f"{out}/{name}_bg.jpg", bg, [cv2.IMWRITE_JPEG_QUALITY, 94])
    cv2.imwrite(f"{out}/{name}_fg.png", np.dstack([img, alpha]))
    cv2.imwrite(f"{out}/{name}_full.jpg", img, [cv2.IMWRITE_JPEG_QUALITY, 94])
    cv2.imwrite(f"{out}/{name}_depth.png", d8)
    print(name, f"fg={m.mean() / 255:.2f}")
