function TestServerComponent({ stars }: { stars: number }) {
  console.log(stars);
  return (
    <div>
      <p>hello test page</p>
      <div className="">{stars}</div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch initial data here
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();

  return {
    props: {
      stars: json.stargazers_count,
    },
  };
}

export default TestServerComponent;
