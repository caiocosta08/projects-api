import app from './app';
import Cfm from './models/Cfm';
// import { data } from './temp'

const PORT = 3008;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    // data.map(async (d: any) => {
    //     await Cfm.create(d)
    // })
});
