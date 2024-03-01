interface iInformation {
  title: string;
  description: string;
}

export default function Information({ title, description }: iInformation) {
  return (
    <div className="flex flex-col">
      <p className="text-2xl">{title}</p>
      <p className="text-md text-gray-100/50">{description}</p>
    </div>
  );
}
