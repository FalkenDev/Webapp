import { render } from '@testing-library/react-native';
import Stock from '../components/stock/Stock';

jest.mock("../components/stock/StockList", () => "StockList");

test('header should exist containing text Lagerförteckning', async () => {
    const { getByText } = render(<Stock />);
    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});