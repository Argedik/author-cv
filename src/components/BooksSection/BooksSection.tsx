import { BooksSectionProps } from '@/types';
import BookCard from '../BookCard/BookCard';
import styles from './BooksSection.module.scss';

export default function BooksSection({ books }: BooksSectionProps) {
  return (
    <section className={styles.booksSection}>
      {books.map((book, index) => (
        <BookCard key={book.id} book={book} index={index} />
      ))}
    </section>
  );
}

