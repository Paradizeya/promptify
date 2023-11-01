type Props = {};

const HomePage = (props: Props) => {
  return (
    <section className="home">
      <h1 className="home__title">
        Discover & Share
        <br />
        <span className="home__title__gradient"> AI-Powered Prompts</span>
      </h1>
      <p className="home__desc">
        Promptify is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
    </section>
  );
};

export default HomePage;
