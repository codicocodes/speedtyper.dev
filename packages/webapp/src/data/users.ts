export default [
  { name: "codico", me: true },
  { name: "ben" },
  { name: "claus" },
  { name: "santa" },
  { name: "carl" },
  { name: "john" },
  { name: "victor" },
  { name: "ben" },
  { name: "claus" },
  { name: "santa" },
  { name: "carl" },
  { name: "john" },
  { name: "victor" },
  { name: "ben" },
  { name: "claus" },
  { name: "santa" },
  { name: "carl" },
  { name: "john" },
  { name: "victor" },
  { name: "ben" },
  { name: "claus" },
  { name: "santa" },
  { name: "carl" },
  { name: "john" },
  { name: "victor" },
].map(user => {
  const progress = Math.floor(Math.random() * 100);
  return {
    ...user,
    me: !!user.me,
    progress,
  };
});
