import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const QuestionContentPage: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading, error } = trpc.useQuery([
		"questions.get-by-id",
		{
			id,
		},
	]);

	if (!isLoading && !data) return <div>Question not found</div>;

	return <div>{data?.question}</div>;
};

const QuestionPage = () => {
	const { query } = useRouter();
	const { id } = query;

	if (!id) return <div>No ID</div>;

	return <QuestionContentPage id={id} />;
};

export default QuestionPage;
