"""Full-episode structure: kinetic B-roll moments; everything else is podcast A-roll.
Writes plan.json and cuts the A-roll audio into lip-sync chunks (<= 30 s) in aroll_audio/."""
import json, os, subprocess
DUR = 293.15
B = [  # (start, end, id, idea)
 (16.13, 24.00, "B01", "سؤال صغير: علامة استفهام تكبر، «فعلاً؟» ثم «فسّرت» تُبرز"),
 (33.66, 47.48, "B02", "صور فوتوغرافية قديمة تطفو وتبهت؛ «المعنى» يبقى بعد ما تختفي الصور؛ «حقائق» تُختم كختم رسمي"),
 (47.48, 58.11, "B03", "الصورة القديمة تحترق ببطء مع «تفسير قديم»"),
 (78.47, 83.85, "B04", "شاشة مقسومة: «تعترف إنك ما بتعرف» | «تتصرّف كأنك عارفها»"),
 (104.60, 111.61, "B05", "بطاقات «أنا عصبي»… تتراكم ثم تُشطب وتسقط"),
 (111.61, 118.90, "B06", "الكاميرا ترجع لورا عبر الكلمات ← «من متى أنا هيك؟» ضخمة"),
 (126.57, 142.35, "B07", "مرآة ضبابية: نسخة قديمة منك تظهر وتختفي؛ «تسكت» ثم «بتتعبك»"),
 (146.11, 150.60, "B08", "«ليش أنا هيك؟» تتحوّل حرفاً حرفاً إلى «هل بدّي أضل هيك؟»"),
 (154.29, 159.40, "B09", "«ننجو»: خط نحاسي يعبر مرحلة ثم ينقطع"),
 (173.67, 187.43, "B10", "سيلويت إنسان يمتلئ بنجوم/ذرات = عالم كامل؛ تظهر داخله: ذكريات، قرارات، أشياء نفسه يحكيها"),
 (196.57, 201.08, "B11", "صورة ناقصة كأحجية تكتمل ببطء: «الصورة كاملة»"),
 (214.94, 217.53, "B12", "انعكاسين متقابلين: «أصعب حوار… مع حالنا»"),
 (240.19, 247.35, "B13", "علامة استفهام واحدة تصير عدسة؛ المشهد خلفها يتغيّر حين ننظر من خلالها"),
 (269.59, 284.83, "B14", "ترجيع (rewind) لمشاهد الحلقة بسرعة ثم توقف: «مرّة تانية»، «انتبهت له وقتها»"),
 (284.83, 289.65, "B15", "«الماضي» يُشطب ← «نفهم» بالنحاسي"),
]
COLD_OPEN = (51.56, 58.11)   # teaser before the episode starts (repeats later in B03)
A, t = [], 0.0
for a, b, *_ in B:
    if a - t > 0.3: A.append((round(t, 2), round(a, 2)))
    t = b
if DUR - t > 0.3: A.append((round(t, 2), DUR))
# split A-roll stretches into <= 30 s chunks at phrase boundaries
from phrases import P
starts = [p[0] for p in P]
chunks = []
for a, b in A:
    s = a
    while b - s > 30:
        cut = max(x for x in starts if s + 8 < x <= s + 30) - 0.15
        chunks.append((round(s, 2), round(cut, 2))); s = cut
    chunks.append((round(s, 2), round(b, 2)))
os.makedirs("aroll_audio", exist_ok=True)
for i, (a, b) in enumerate(chunks, 1):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(a), "-to", str(b), "-i", "voice_full_-14LUFS.mp3",
                    "-af", f"afade=t=in:d=0.04,afade=t=out:st={b - a - 0.08:.2f}:d=0.08", "-ac", "1", f"aroll_audio/A{i:02}_{a:06.2f}-{b:06.2f}.wav"], check=True)
def mmss(x): return f"{int(x // 60)}:{x % 60:05.2f}"
lines = lambda a, b: " ".join(p[2] for p in P if p[0] >= a - 0.05 and p[0] < b)
json.dump(dict(duration=DUR, cold_open=COLD_OPEN, broll=[dict(start=a, end=b, id=i, idea=d) for a, b, i, d in B],
               aroll=[dict(id=f"A{i:02}", start=a, end=b, text=lines(a, b)) for i, (a, b) in enumerate(chunks, 1)]),
          open("plan.json", "w"), ensure_ascii=False, indent=1)
ta = sum(b - a for a, b in chunks); tb = sum(b - a for a, b, *_ in B)
print(f"A-roll {ta:.0f}s ({ta / DUR:.0%}) in {len(chunks)} chunks; B-roll {tb:.0f}s ({tb / DUR:.0%})")
for i, (a, b) in enumerate(chunks, 1): print(f"A{i:02} {mmss(a)}-{mmss(b)} ({b - a:4.1f}s)")
