import { Image } from "next/dist/client/image-component";

const Loading = () => {
  return (
    <section className="loading">
      <Image
        src={"/assets/icons/loader.svg"}
        alt="Loading..."
        width={200}
        height={200}
      />
    </section>
  );
};

export default Loading;
