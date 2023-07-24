import { defaultState } from './../../store/reducers/items/initialState';
import { itemsReducer } from '../../store/reducers/items/items';
import { saveItems } from '../../store/actions/items';
import { ITEM_PRIORITY } from '../../components/CreateItemForm/types';
import { IRequestItem } from '../../store/reducers/items/types';

describe('Сохранение элементов в redux', () => {
    let testItem: IRequestItem;
    beforeAll(() => {
        testItem = {
            id: 1,
            title: 'First element',
            text: 'Text of first element',
            priority: ITEM_PRIORITY.LOW
        };
    });
    test('Добавление элемента в redux', () => {
        const action = saveItems([[testItem], 1]);
        const reducer = itemsReducer(defaultState, action);
        expect(reducer.items).toHaveLength(1);
        expect(reducer.count).toBe(1);
    });
});