import React, { useEffect,useState } from 'react'
import './Dashboard.scss'
import Logo from '../assets/logo1.svg'
import Avatar from '../assets/avatar.webp'
import { getCountLike, getCountDislike, getCountUser, getCountQuestion } from '../service/Tk'
export default function dashboard() {
    const [ArrLike, setArrLike] = useState("");
    const [ArrDislike, setArrDislike] = useState("");
    const [ArrUser, setArrUser] = useState("");
    const [ArrQuestion, setArrQuestion] = useState("");
    const [StartDate, setStartDate] =useState('');
    const [EndDate,setEndDate] = useState('')
    useEffect(()=>{
        if(EndDate && StartDate){
            setArrLike("")
            setArrDislike("")
            setArrQuestion("")
            setArrUser("")
            getLike();
            getQuestion();
            getDisLike();
            getUser();
        }
    },[StartDate,EndDate])
    useEffect(()=>{
        handleSetDate(2);
    },[])
    useEffect(()=>{
        if(ArrLike !== "" && ArrQuestion !== "" && ArrUser !== "" && ArrDislike !== ""){
        let datalike = [];
        let dataquestion = [];
        let datadislike = [];
        let datauser = [];
        for(let i = 0 ; i < ArrLike.results.length; i++){
            datalike.push(ArrLike.results[i].count);
            dataquestion.push(ArrQuestion.results[i].count)
            datadislike.push(ArrDislike.results[i].count);
            datauser.push(ArrUser.results[i].count);
        }
        const chartOptions1 = {
          title: {
            text: "Thống kê số lượng tương tác trong tháng",
            align: "left",
          },

          yAxis: {
            title: {
              text: "Số lượng",
            },
          },

          xAxis: {
            accessibility: {
              rangeDescription: "Range: 1 to 31",
            },
          },

          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
          },

          plotOptions: {
            series: {
              label: {
                connectorAllowed: false,
              },
              pointStart: 1,
            },
          },

          series: [
            {
              name: "Like",
              data: datalike,
            },
            {
              name: "Questions",
              data: dataquestion,
            },
            {
              name: "Dislike",
              data: datadislike,
            },
            {
              name: "User",
              data: datauser,
            },
          ],

          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500,
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom",
                  },
                },
              },
            ],
          },
        };
      
          const chartOptions2 = {
            chart: {
              type: 'pie',
              contextMenu: {
                enabled: true
              }
            },
            title: {
              text: 'Fruit Consumption'
            },
            xAxis: {
              categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
              title: {
                text: 'Fruit eaten'
              }
            },
            series: [
              {
                name: 'Jane',
                data: [1, 0, 4]
              }
            ]
          };
      
          const chart1 = Highcharts.chart('container', chartOptions1);
          const chart2 = Highcharts.chart('container1', chartOptions2);
      
          return () => {
            chart1.destroy();
            chart2.destroy();
          };
        }
    },[ArrLike,ArrQuestion,ArrUser,ArrDislike])
    const getLike = async () => {
        let rp = await getCountLike({
            from : StartDate,
            to : EndDate
        });
        if(rp) {
            setArrLike(rp)
            return rp;
        }
        // console.log(rp.total)
    }
    const getDisLike = async () => {
        let rp = await getCountDislike({
            from : StartDate,
            to : EndDate
        });
        if(rp) {
            setArrDislike(rp)
            return rp;
        }
        // console.log(rp.total)
    }
    const getUser = async () => {
        let rp = await getCountUser({
            from : StartDate,
            to : EndDate
        });
        if(rp) {
            setArrUser(rp)
            return rp;
        }
        // console.log(rp.total)
    }
    const getQuestion = async () => {
        let rp = await getCountQuestion({
            from : StartDate,
            to : EndDate
        });
        if(rp) {
            setArrQuestion(rp)
            return rp;
        }
        // console.log(rp.total)
    }
    const handleSetDate =(option)=>{
        const today = new Date();
        if(option === 1){
            setStartDate(today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate())
            setEndDate(today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate())
        }
        if (option === 2) {
            let dayOfWeek = today.getDay();
            if (dayOfWeek === 0) {
                dayOfWeek = 1;
            }
            // Lấy ngày đầu tuần (ngày thứ Hai)
            const startOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek));
            // Lấy ngày cuối tuần (ngày Chủ Nhật)
            const endOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek + 6));

            setStartDate(startOfWeek.getFullYear()+"-"+(startOfWeek.getMonth()+1)+"-"+startOfWeek.getDate())
            setEndDate(endOfWeek.getFullYear()+"-"+(endOfWeek.getMonth()+1)+"-"+endOfWeek.getDate())
        }
        if (option === 3) {
            // const today = new Date();
            // Lấy ngày đầu tháng
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);    
            // Lấy ngày kết thúc tháng
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            setStartDate(startOfMonth.getFullYear()+"-"+(startOfMonth.getMonth()+1)+"-"+startOfMonth.getDate())
            setEndDate(endOfMonth.getFullYear()+"-"+(endOfMonth.getMonth()+1)+"-"+endOfMonth.getDate())
        }
    }
  return (
    <div className='dashboard'>
        <div className='dashboard-menu'>
            <div className='dashboard-logo'>
                <img src={Logo}></img>
            </div>
            <ul>
                <li><i className="fa-solid fa-table"></i></li>
                <li><i className="fa-solid fa-message"></i></li>
                <li><i className="fa-solid fa-circle-user"></i></li>
                <li><i className="fa-solid fa-gear"></i></li>
            </ul>
        </div>
        <div className='content-dashboard'>
            <div className='dashboard-top'>
                <div className='menu-dashboard-top'>
                    <div className='title-dashboard'>
                        <span>Dashboard</span>
                    </div>
                    <div className='menu-dashboard-top-item'>
                        <div className="dropdown">
                            <button className="dropdown-toggle">Theo tháng</button>
                            <ul className="dropdown-menu">
                                <li onClick={()=>{handleSetDate(1)}}><a href="#">Theo ngày</a></li>
                                <li onClick={()=>{handleSetDate(2)}} ><a>Theo tuần</a></li>
                                <li onClick={()=>{handleSetDate(3)}}><a href="#">Theo tháng</a></li>
                            </ul>
                        </div>
                        <div className='avatar'>
                            <img src={Avatar}></img>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className='dashboard-option'>
                    <div className='dashboard-top-1'>
                        <div className='btn-dashboard' >
                            <div className='icon-btn' style={{background: '#3CD856'}}>
                                <i className="fa-solid fa-thumbs-up"></i>
                            </div>
                            <div className='text-btn'>
                                <div className='title-btn'>
                                    <span>Like</span>
                                </div>
                                <div className='count-btn'>
                                   { ArrLike && <span>{ArrLike.total}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-top-1'>
                        <div className='btn-dashboard' >
                            <div className='icon-btn' style={{background: '#FA5A7D'}}>
                                <i className="fa-solid fa-thumbs-down"></i>
                            </div>
                            <div className='text-btn'>
                                <div className='title-btn'>
                                    <span>Dislike</span>
                                </div>
                                <div className='count-btn'>
                                    {ArrDislike && <span>{ArrDislike.total}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-top-1'>
                        <div className='btn-dashboard' >
                            <div className='icon-btn' style={{background: '#FF947A'}}>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className='text-btn'>
                                <div className='title-btn'>
                                    <span>Message</span>
                                </div>
                                <div className='count-btn'>
                                {ArrQuestion && <span>{ArrQuestion.total}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-top-1'>
                        <div className='btn-dashboard' >
                            <div className='icon-btn' style={{background: '#BF83FF'}}>
                                <i className="fa-solid fa-user" ></i>
                            </div>
                            <div className='text-btn'>
                                <div className='title-btn'>
                                    <span>Member</span>
                                </div>
                                <div className='count-btn'>
                                   {ArrUser && <span>{ArrUser.total}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-top-mobile-1'>
                        <div className='dashboard-top-2'>
                            <div className='btn-dashboard' >
                                <div className='icon-btn' style={{background: '#3CD856'}}>
                                    <i className="fa-solid fa-thumbs-up"></i>
                                </div>
                                <div className='text-btn'>
                                    <div className='title-btn'>
                                        <span>Like</span>
                                    </div>
                                    <div className='count-btn'>
                                        {ArrLike && <span>{ArrLike.total}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='dashboard-top-2'>
                            <div className='btn-dashboard' >
                                <div className='icon-btn' style={{background: '#FA5A7D'}}>
                                    <i className="fa-solid fa-thumbs-down"></i>
                                </div>
                                <div className='text-btn'>
                                    <div className='title-btn'>
                                        <span>Dislike</span>
                                    </div>
                                    <div className='count-btn'>
                                        {ArrDislike && <span>{ArrDislike.total}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-top-mobile-2'>
                        <div className='dashboard-top-2'>
                            <div className='btn-dashboard' >
                                <div className='icon-btn' style={{background: '#FF947A'}}>
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div className='text-btn'>
                                    <div className='title-btn'>
                                        <span>Message</span>
                                    </div>
                                    <div className='count-btn'>
                                    {ArrQuestion && <span>{ArrQuestion.total}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='dashboard-top-2'>
                            <div className='btn-dashboard' >
                                <div className='icon-btn' style={{background: '#BF83FF'}}>
                                    <i className="fa-solid fa-user" ></i>
                                </div>
                                <div className='text-btn'>
                                    <div className='title-btn'>
                                        <span>Member</span>
                                    </div>
                                    <div className='count-btn'>
                                    {ArrUser && <span>{ArrUser.total}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dashboard-mid'>
                <div className='dashboard-chart-erea'>
                    <div id="container" style={{width:'100%', height:'400px', borderRadius: '10px'}}></div>
                </div>
                <div className='dashboard-chart-pie'>
                    <div id="container1" style={{width:'100%', height:'400px', borderRadius: '10px'}}></div>
                </div>
            </div>
            <div className='dashboard-bottom'>
                <div className='dashboard-bottom-head'>
                    <div className='dashboard-bottom-head-left'>
                        <h3>Những câu hỏi phổ biến</h3>
                        <span>Trong hơn 10K+ câu hỏi</span>
                    </div>
                    <div className='dashboard-bottom-head-right'>
                        {/* <div className='btn-date'><span>Day</span></div>
                        <div className='btn-date'><span>Week</span></div>
                        <div className='btn-date'><span>Month</span></div> */}
                    </div>
                </div>
                <div className='dashboard-bottom-table'>
                    <table>
                        <thead>
                            <tr>
                                <th className='ahuhu'><span>Câu hỏi</span></th>
                                <th><span>Chủ đề</span></th>
                                <th><span>Số lượt hỏi</span></th>
                                <th><span>Số lượt thích</span></th>
                                <th><span>Số lượt không thích</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                            <tr>
                                <td><span>Hôm nay ăn gì</span></td>
                                <td><span>Du lịch</span></td>
                                <td><span>10.000</span></td>
                                <td><span>9.000</span></td>
                                <td><span>1.000</span></td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
