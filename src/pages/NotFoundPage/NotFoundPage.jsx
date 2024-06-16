import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className={css.notFoundWrapper}>
        <p className={css.tooltip}>Page not found.</p>
        <Link className={css.notFoundLink} to="/">
          Return to Home Page
        </Link>
    </div>
  );
}