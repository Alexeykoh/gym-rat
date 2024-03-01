interface iTitle {
  text: string;
}

export default function Title({ text }: iTitle) {
  return <h2 className="text-4xl font-semibold">{text}</h2>;
}
