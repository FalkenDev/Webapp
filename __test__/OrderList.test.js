import { render } from '@testing-library/react-native';
import OrderList from '../components/pick/OrderList';

jest.mock("../components/pick/Pick", () => "Pick");

test('header should exist containing text Ordrar redo att plockas', async () => {
    const { getByText } = render(<OrderList route/>);
    const header = await getByText('Ordrar redo att plockas');

    expect(header).toBeDefined();
});