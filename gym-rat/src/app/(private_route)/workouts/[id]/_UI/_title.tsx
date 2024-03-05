interface iTitle {
  name: string;
}

export default function Title({ name }: iTitle) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl w-full">{name}</h1>
    </div>
  );
}
