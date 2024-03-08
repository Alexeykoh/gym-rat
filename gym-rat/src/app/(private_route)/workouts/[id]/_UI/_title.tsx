interface iTitle {
  name: string;
}

export default function Title({ name }: iTitle) {
  return (
    <div className="flex flex-col">
      <p className=" text-xs text-gray-400">Название</p>
      <h1 className="text-2xl w-full">{name}</h1>
    </div>
  );
}
