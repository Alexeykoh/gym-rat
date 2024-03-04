interface iTitle {
  name: string;
  date: string;
}

export default function Title({ name, date }: iTitle) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-5xl w-3/4">{name}</h1>
      <p className="text-md text-gray-500">
        {date ? new Date(date as string).toLocaleDateString("ru-RU") : null}
      </p>
    </div>
  );
}
