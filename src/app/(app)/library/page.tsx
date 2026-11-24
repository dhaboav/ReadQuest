import { BookCopyIcon, TagsIcon, UsersIcon } from 'lucide-react';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { BookContent } from '@/components/library/book/book-content';
import { AuthorContent } from '@/components/library/metadata/author-content';
import { GenreContent } from '@/components/library/metadata/genre-content ';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = { title: 'Library · ReadQuest' };

export default function LibraryPage() {
  return (
    <main className="mx-auto my-6 max-w-7xl">
      <Tabs defaultValue="book">
        <TabsList variant="line">
          <TabsTrigger value="book">
            <BookCopyIcon />
            Book
          </TabsTrigger>
          <TabsTrigger value="author">
            <UsersIcon />
            Author
          </TabsTrigger>
          <TabsTrigger value="genre">
            <TagsIcon />
            Genre
          </TabsTrigger>
        </TabsList>

        <TabsContent value="book" className="flex flex-col gap-6 pt-5">
          <Suspense fallback={<p>Loading books...</p>}>
            <BookContent />
          </Suspense>
        </TabsContent>

        <TabsContent value="author" className="flex flex-col gap-6 pt-5">
          <Suspense fallback={<p>Loading authors...</p>}>
            <AuthorContent />
          </Suspense>
        </TabsContent>

        <TabsContent value="genre" className="flex flex-col gap-6 pt-5">
          <Suspense fallback={<p>Loading genres...</p>}>
            <GenreContent />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  );
}
