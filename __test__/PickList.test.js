import { render } from '@testing-library/react-native';
import PickList from '../components/pick/PickList';

const test =  {
    "params": {
        "order": {
            "address": "Norasgatan 3",
            "city": "Karlskrona",
            "country": "Sweden",
            "id": 7000,
            "name": "Anders",
            "order_items": [],
            "status": "Ny",
            "status_id": 100,
            "zip": "34567",
        },
    },
};

const setProducts = () => false;

it('Test if Anders, Karlskrona and Zip appear in PickList when sent in a order in route.params', async () => {
    const { getByText } = render(<PickList route={test} setProducts={setProducts} />);
    const anders = await getByText('Anders', { exact: false });
    const karlskrona = await getByText('Karlskrona', { exact: false });
    const zip = await getByText('34567', { exact: false });

    expect(anders).toBeDefined();
    expect(karlskrona).toBeDefined();
    expect(zip).toBeDefined();
});