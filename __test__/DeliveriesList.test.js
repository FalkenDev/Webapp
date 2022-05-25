import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/delivery/DeliveriesList';

jest.mock("../components/delivery/Deliveries", () => "Deliveries");


test('warning message should exist containing text Det finns inga inleveranser. when theres no deliveries', async () => {
    const { getByText } = render(<DeliveriesList route/>);
    const warning = await getByText('Det finns inga inleveranser.');

    expect(warning).toBeDefined();
});