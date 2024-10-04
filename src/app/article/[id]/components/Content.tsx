"use client";

import Share from "@/app/icons/Share";
import stripHtml from "@/app/utils/strip-html";
import dayjs from "dayjs";

export default function Content(props: { article: Article }) {
  const share = () => {
    const config = {
      title: props.article.title,
      url: window.location.href,
      text: stripHtml(props.article.content),
    };

    if (navigator.canShare(config)) {
      navigator.share(config);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">{props.article.title}</h1>
      <div className="flex items-center">
        <p className="my-3 font-semibold text-slate-500">
          {dayjs(props.article.created_at).format("DD-MM-YYYY")}
        </p>

        <div className="ml-auto">
          <div onClick={share}>
            <Share />
          </div>
        </div>
      </div>
      <div
        className="-mt-2"
        dangerouslySetInnerHTML={{ __html: props.article.content }}
      ></div>
    </div>
  );
}
