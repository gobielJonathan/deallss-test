"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickSlider from "react-slick";
import Link from "next/link";

export default function Slider(props: { initialData: Articles }) {
  return (
    <SlickSlider
      dots
      infinite
      lazyLoad="ondemand"
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
    >
      {props.initialData.data.map((a) => (
        <Link key={a.id} href={`/article/${a.slug}?id=${a.id}`}>
          <div className="shadow-lg rounded-xl p-3">
            <h3 className="text-2xl font-bold">{a.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: `<p><br></p><ul><li>Pendidikan min. D3/S1 semua jurusan</li><li><strong>Bersedia tidak menggunakan atribut keagamaan saat bekerja</strong></li><li><strong>Diutamakan dapat berkomunikasa dalam Bahasa Jepang &amp; Bahasa Inggris</strong></li><li><strong>Memiliki pengalaman minimal 2 tahun sebagi Marketing dibidang Property</strong></li><li>Memiliki kemampuan komunikasi dan interpersonal skill yang sangat baik</li><li>Suka dengan pekerjaan dibidang penjualan property dan rumah-rumah mewah</li><li>Memiliki kemampuan bernegosiasi dan mempengaruhi</li><li>Memiliki motivasi / keinginan kuat untuk berhasil</li><li>Memiliki pengetahuan tentang Digital Marketing</li><li><strong>Penempatan Cikarang - Jawa Barat</strong></li></ul>\n    <p><br></p><ul><li>Mencari calon pembeli yang sesuai dengan segmen produk</li><li>Melakukan presentasi dan penawaran produk kepada calon pembeli</li><li>Melakukan follow up dan membangun hubungan baik dengan customer</li><li>Membuat rencana dan strategi untuk mencapai target penjualan</li><li>Menjalankan kegiatan penjualan seperti pameran, canvassing, digital Marketing, dll.</li><li>Penempatan di&nbsp;<strong>Cikarang - Jawa Barat</strong></li></ul>`,
              }}
              className="overflow-hidden text-ellipsis line-clamp-5 *:text-sm -mt-2"
            ></div>
          </div>
        </Link>
      ))}
    </SlickSlider>
  );
}
