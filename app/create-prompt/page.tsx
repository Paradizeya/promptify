import Form from "@/components/form/Form";

const CreatePage = () => {
  return (
    <section className="create">
      <div>
        <h1 className="create__title">Create Prompt</h1>
        <p className="create__desc">
          Create and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform
        </p>
      </div>
      <Form />
    </section>
  );
};

export default CreatePage;
