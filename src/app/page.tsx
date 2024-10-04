import Link from "next/link";

import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Article | Home",
  description: "Discover the latest articles",
  openGraph: {
    type: "website",
    title: "Article | Home",
    description: "Discover the latest articles",
  },
  twitter: {
    title: "Latest Articles on SEO & Digital Marketing | YourWebsite",
    description: "Discover the latest articles",
  },
};

export default async function Home(props: {
  searchParams: { nav_id: string };
}) {
  const categories = (await fetch(`${process.env.BASE_API}/categories`)
    .then((res) => res.json())
    .then((res) => res.data)) as Category[];

  const articleURL = new URL(`${process.env.BASE_API}/articles`);
  articleURL.searchParams.set("search", "");
  articleURL.searchParams.set("limit", "5");
  articleURL.searchParams.set("page", "1");
  articleURL.searchParams.set("sort", "");
  articleURL.searchParams.set(
    "category_id",
    props.searchParams.nav_id ?? categories[0]?.id
  );

  const content = await fetch(articleURL.toString())
    .then((res) => res.json())
    .then((res) => res.data);

  const foryouURL = new URL(`${process.env.BASE_API}/articles`);
  foryouURL.searchParams.set("search", "");
  foryouURL.searchParams.set("limit", "2");
  foryouURL.searchParams.set("page", "1");
  foryouURL.searchParams.set("sort", "");

  const fypContents = (await Promise.allSettled(
    categories.map((c) => {
      foryouURL.searchParams.set("category_id", String(c.id));
      return fetch(foryouURL.toString())
        .then((res) => res.json())
        .then((res) => res.data);
    })
  )
    .then((res) => res.filter((r) => r.status === "fulfilled"))
    .then((res) => res.map((r) => r.value))) as Articles[];

  return (
    <>
      <p className="font-semibold text-slate-500">Saturday, Augs 12th</p>
      <h1 className="mt-4 text-2xl font-bold">
        Welcome, <br />
        John Doe
      </h1>

      <Navbar
        items={categories.map((a) => ({ key: String(a.id), value: a.name }))}
      />

      <Slider initialData={content} />

      <div className="mt-12 mb-2 flex justify-between">
        <h4 className="text-slate-500 font-semibold text-xl">Just for you</h4>
      </div>

      <div className="flex flex-col gap-y-4">
        {fypContents
          .map((f) => f.data)
          .flat(1)
          .map((f) => (
            <Link key={f.id} href={`/article/${f.slug}?id=${f.id}`}>
              <div className="shadow-lg rounded-xl p-3">
                <h3 className="text-2xl font-bold">{f.title}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p><br></p><ul><li>Pendidikan min. D3/S1 semua jurusan</li><li><strong>Bersedia tidak menggunakan atribut keagamaan saat bekerja</strong></li><li><strong>Diutamakan dapat berkomunikasa dalam Bahasa Jepang &amp; Bahasa Inggris</strong></li><li><strong>Memiliki pengalaman minimal 2 tahun sebagi Marketing dibidang Property</strong></li><li>Memiliki kemampuan komunikasi dan interpersonal skill yang sangat baik</li><li>Suka dengan pekerjaan dibidang penjualan property dan rumah-rumah mewah</li><li>Memiliki kemampuan bernegosiasi dan mempengaruhi</li><li>Memiliki motivasi / keinginan kuat untuk berhasil</li><li>Memiliki pengetahuan tentang Digital Marketing</li><li><strong>Penempatan Cikarang - Jawa Barat</strong></li></ul>\n    <p><br></p><ul><li>Mencari calon pembeli yang sesuai dengan segmen produk</li><li>Melakukan presentasi dan penawaran produk kepada calon pembeli</li><li>Melakukan follow up dan membangun hubungan baik dengan customer</li><li>Membuat rencana dan strategi untuk mencapai target penjualan</li><li>Menjalankan kegiatan penjualan seperti pameran, canvassing, digital Marketing, dll.</li><li>Penempatan di&nbsp;<strong>Cikarang - Jawa Barat</strong></li></ul>`,
                  }}
                  className="overflow-hidden text-ellipsis line-clamp-5 *:text-sm -mt-2"
                ></div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
