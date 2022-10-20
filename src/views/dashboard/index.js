import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import TotalConcluidosCard from "./TotalConcluidosCard";
import UltimosConcluidosCard from "./UltimosConcluidosCard";
import TotalEnviosLineChartCard from "./TotalEnviosLineChartCard";
import TotalEmTransitoCard from "./TotalEmTransitoCard";
import TotalCanceladosCard from "./TotalCanceladosCard";
import TotalStatusEnviosBarChartCard from "./TotalStatusEnviosBarChartCard";
import { gridSpacing } from "store/constant";

import myContract from "views/myContract";
import web3 from "views/web";
import { Tune } from "@mui/icons-material";

const ChartData = {
  type: 'line',
  height: 90,
  options: {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#fff'],
    fill: {
      type: 'solid',
      opacity: 1
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    yaxis: {
      min: 0,
      max: 100
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: 'Total Order'
      },
      marker: {
        show: false
      }
    }
  },
  series: [
    {
      name: 'envios',
      data: [0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]
};

const createData = (id, name, status) => {
  return { id, name, status };
};

const formatData = (packagesObject) => {
  let items = [];
  packagesObject.map((item) => {
    let dataStatus = item[5];

    if (dataStatus == "0") dataStatus = "Em processamento";
    if (dataStatus == "1") dataStatus = "Em transporte";
    if (dataStatus == "2") dataStatus = "Entregue";
    if (dataStatus == "3") dataStatus = "Cancelado";

    let data = createData(item[0], item[1], dataStatus);
    items.push(data);
    console.log(data);
  });
  return items;
};

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [totalConcluidos, setTotalConcluidos] = useState(0);
  const [totalProcessamento, setTotalProcessamento] = useState(0);
  const [totalTransito, setTotalTransito] = useState(0);
  const [totalCancelado, setTotalCancelado] = useState(0);
  const [arrayData, setArrayData] = useState([]);
  const [arrayDataHoje, setArrayDataHoje] = useState([]);
  const [totalConcluidosHoje, setTotalConcluidosHoje] = useState(0);
  const [newdata, setNewdata] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const receiveAddress = await web3.eth.getAccounts();
    await myContract.methods
      .listMySentPackages()
      .call({ from: receiveAddress[0] })
      .then((res) => {
        setPackages(res);
        getTotalConcluidos(res);
        setLoading(false);
      })
  };

  const getTotalConcluidos = (res) => {

    console.log(res);
    var count = 0;
    var transito = 0;
    var processamento = 0;
    var cancelado = 0;

    var flag1 = false;

    var currentData = new Date();
    var _totalConcluidosHoje = 0;

    var items = [];
    var items1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var items2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var items3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var items4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    var timesChardata = [0, 0, 0, 0, 0, 0, 0, 0,
                         0, 0, 0, 0, 0, 0, 0, 0,
                         0, 0, 0, 0, 0, 0, 0, 0,
                         0, 0, 0, 0, 0, 0, 0, 0];

    var itemssss = []


    for (let i = 0; i < 12; i++) {
      res.map((item) => {
        let dataStatus = item[5];

        if (flag1 == false) {
          if (dataStatus == "0") processamento = processamento += 1
          if (dataStatus == "1") transito = transito + 1;
          if (dataStatus == "2") count = count + 1;
          if (dataStatus == "3") cancelado = cancelado + 1;

          let data = createData(item[0], item[1], dataStatus);
          items.push(data);

          let _unix_timestamp = parseInt(item[7]);
          var _date = new Date(_unix_timestamp * 1000);
          console.log(currentData.getUTCDate(), _date.getUTCDate(), item[5])
          if (currentData.getUTCDate() === _date.getUTCDate() && item[5] == "2"){
            
            timesChardata[_date.getHours()] += 1;
            _totalConcluidosHoje += timesChardata[_date.getHours()];
          }
        }
        
        let _unix_timestamp = parseInt(item[6]);
        var _date = new Date(_unix_timestamp * 1000);

        // console.log(currentDate.getUTCFullYear(), _date.getUTCFullYear(), _date.getUTCMonth(), index)
        if (_date.getUTCMonth() == i) {
          if (dataStatus == "0") items1[i] += 1
          if (dataStatus == "1") items2[i] += 1;
          if (dataStatus == "2") items3[i] += 1;
          if (dataStatus == "3") items4[i] += 1;
        }

      });
      itemssss.push(items1[i] + items2[i] + items3[i] + items4[i]);
      flag1 = true;
    }
    setTotalProcessamento(processamento);
    setTotalTransito(transito);
    setTotalConcluidos(count);
    setTotalCancelado(cancelado);
    setArrayData([items1, items2, items3, items4]);
    setArrayDataHoje(timesChardata);
    setTotalConcluidosHoje(_totalConcluidosHoje);
    setNewdata(itemssss);
    return count;
  }


  return (
    <div>
      {/* <div><li>{packages}</li></div> */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalConcluidosCard isLoading={isLoading} totalConcluidos={totalConcluidos} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalEnviosLineChartCard isLoading={isLoading} totalEnvios={totalCancelado + totalConcluidos + totalProcessamento + totalTransito} 
              items={newdata}
              />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalEmTransitoCard isLoading={isLoading} totalTransito={totalProcessamento} />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalCanceladosCard isLoading={isLoading} totalCancelado={totalCancelado} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <TotalStatusEnviosBarChartCard isLoading={isLoading} data={arrayData} totalEnvios={totalCancelado+totalConcluidos+totalProcessamento+totalTransito} />
            </Grid>
            <Grid item xs={12} md={4}>
              <UltimosConcluidosCard isLoading={isLoading} data={packages} dataChartHoje={arrayDataHoje}  />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
