import { Metadata } from "next";
import Content from "./components/Content";
import stripHtml from "@/app/utils/strip-html";

export async function generateMetadata(props: {
  searchParams: { id: string };
}): Promise<Metadata> {
  const content = (await fetch(
    `https://fe-tech-test-api-dev-416879028044.asia-southeast2.run.app/api/v1/articles/${props.searchParams.id}`
  )
    .then((res) => res.json())
    .then((res) => res.data)) as Article;

  return {
    title: content.title,
    description: stripHtml(content.content),
    openGraph: {
      type: "website",
      title: content.title,
      description: stripHtml(content.content),
    },
    twitter: {
      title: content.title,
      description: stripHtml(content.content),
    },
  };
}

export default async function Page(props: { searchParams: { id: string } }) {
  const content = await fetch(
    `https://fe-tech-test-api-dev-416879028044.asia-southeast2.run.app/api/v1/articles/${props.searchParams.id}`
  ).then((res) => res.json());

  return <Content article={content.data} />;
}
