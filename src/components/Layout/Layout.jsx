import css from './Layout.module.css';
import AppBar from '../AppBar/AppBar';

export default function Layout({ children }) {
  return (
    <div>
      <AppBar />
      <main className={css.mainContainer}>{children}</main>
    </div>
  );
}