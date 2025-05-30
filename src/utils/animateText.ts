// utils/animateText.ts
export const animateText = (
  target: string,
  onUpdate: (output: string) => void,
  onComplete: () => void,
  intervalTime = 40
) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let frame = 0;
  const maxFrames = 10;

  const interval = setInterval(() => {
    const output = target
      .split('')
      .map((c, i) =>
        frame >= maxFrames ? c : i <= frame ? c : chars[Math.floor(Math.random() * chars.length)]
      )
      .join('');

    onUpdate(output);
    frame++;
    if (frame > target.length + maxFrames) {
      clearInterval(interval);
      onComplete();
    }
  }, intervalTime);

  return () => clearInterval(interval);
};
