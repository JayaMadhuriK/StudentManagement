const conn = require('./database');
http = require('http');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path:'./.env'
})


const app1 = require('./routes/BtechRouter');
const app2 = require('./routes/MtechRouter');
const app3 = require('./routes/MscORMca_Router');
const app4 = require('./routes/PlacementOutgoing_Router');
const app5 = require('./routes/CollaborativeActivities_Router');
const app6 = require('./routes/ValueAddedCourse_Router');
const app7 = require('./routes/DemadRatio_Router');
const app8 = require('./routes/AvgNumberOfDays_Router');
const app9 = require('./routes/Avgpasspercentage_Router');
const app10 = require('./routes/Awards_Router');
const app11 = require('./routes/Per_Students_Undertaking_Router');
const app12 = require('./routes/HigherEducation_Router');
const app13 = require('./routes/StudentComputerRatio_Router');
const app14 = require('./routes/CouncilActivity_Router');
const app15 = require('./routes/StudentSatisfactory_Router');
const app16 = require('./routes/login');
const app20 = require('./routes/Education');
const excel = require('./routes/Excel');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/btech',app1);
app.use('/mtech',app2);
app.use('/mscormca',app3);
app.use('/placement',app4);
app.use('/activities',app5);
app.use('/',app6);
app.use('/demandratio',app7);
app.use('/avgnumberofdays',app8);
app.use('/avgpasspercentage',app9);
app.use('/awards',app10);
app.use('/internships',app11);
app.use('/highereducation',app12);
app.use('/computerratio',app13);
app.use('/councilactivities',app14);
app.use('/studentsatisfactory',app15);
app.use('/',app16);
app.use('/download',excel);
app.use('/exam',app20)

const server = http.createServer(app);

server.listen(process.env.DATABASE_PORT,()=>{
    console.log('listening on port '+process.env.DATABASE_PORT);
});
