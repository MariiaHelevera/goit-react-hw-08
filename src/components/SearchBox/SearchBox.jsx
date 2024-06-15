import css from './SearchBox.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilters, changeFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const filter = useSelector(selectFilters);
  const dispatch = useDispatch();


  return (
    <div className={css.searchWrapper}>
        <label>
            Find contacts by name
            <input
                className={css.searchInput}
                type="text"
                value={filter}
                onChange={evt => dispatch(changeFilter(evt.target.value))}
            />
        </label>
    </div>
  );
}

export default SearchBox;