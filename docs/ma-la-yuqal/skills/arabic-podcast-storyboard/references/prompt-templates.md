# Prompt templates

## Shared style suffix (append to every scene prompt)
```
muted teal-black shadows, warm amber practical light, desaturated palette, soft film grain,
Kodak Vision3 500T look, anamorphic lens, shallow depth of field, large empty negative space in
the [upper-middle | lower third | left] of the frame for text. No text, no logos.
```
Drop filler like "4k, 8k, masterpiece, photorealistic" — it adds nothing and can look plastic.
Name the negative-space position explicitly: it is the most useful line in the prompt.

## Still, no person (Seedream 5 Pro / Midjourney / Flux)
```
Vertical cinematic film still. [subject + action]. [setting + one concrete detail].
[single motivated light source]. [mood in 3–5 words]. [where the subject sits; where the empty
space is]. <style suffix>
```
Midjourney extras: `--ar 9:16 --style raw --s 150`. Seedream/Flux: set aspect_ratio 9:16 as a
parameter, not in the prompt.

## Still with the host's likeness (Nano Banana Pro / gemini-3-pro-image)
Attach references and say what each one is for:
```
Using the attached references:
- Reference 1 is the man's identity: exact face shape, eyes, eyebrows, nose, short dark hair with
  receding temples, trimmed beard and moustache with goatee.
- Reference 2 is a close-up of his mouth area: keep the small dark mole above the left corner of
  his upper lip (on the image-right side when he faces camera) and the exact beard texture with
  grey hairs.
- Reference 3 shows his build and posture.

Create a vertical cinematic film still of this same man [action] in [setting]. [light].
[framing + negative space]. <style suffix> Natural skin texture, not beautified.
```
For mirror shots add "mirrored correctly" to the mole line. Check every result for the mole side.

## Video shot (Google Flow / Veo 3.1, Ingredients to Video, 9:16, 8 s)
```
[shot size], vertical. The same man from the references [action, one beat only].
[camera: very slow push-in | slow pull-back | locked-off]. [light]. [mood].
[Dialogue line in quotes, Levantine Arabic, only for direct-to-camera shots] |
No dialogue, [ambience].
<style suffix> Keep his exact face, beard, goatee and the small mole above the left corner of
his upper lip.
```
Generated voices are never his: mute every clip and use the real recording. Lip movement from a
prompted line only roughly matches, so keep talking shots short or cut away.

## Motion for an existing still (image-to-video, any model)
```
very slow camera push-in, almost imperceptible movement, subtle drifting dust, no cuts, calm,
24fps, slow motion
```
