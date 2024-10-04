"use client";

import dayjs from "dayjs";

export default function Content(props: { article: Article }) {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">{props.article.title}</h1>
      <p className="my-3 font-semibold text-slate-500">
        {dayjs(props.article.created_at).format("DD-MM-YYYY")}
      </p>
      <div
        className="-mt-2"
        dangerouslySetInnerHTML={{ __html: props.article.content }}
      ></div>
    </div>
  );
}
