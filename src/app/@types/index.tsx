interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
  categories: any;
}

interface Articles {
  data: { id: number; slug: string; title: string }[];
  metadata: {
    page: number;
    limit: number;
    total_docs: number;
    total_pages: number;
    has_next_page: boolean;
  };
}

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
