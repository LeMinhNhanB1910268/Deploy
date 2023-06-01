import React from 'react'
import './Dashboard.scss'
import Logo from '../assets/logo1.svg'
import Avatar from '../assets/avatar.webp'
export default function dashboard() {
    document.addEventListener('DOMContentLoaded', function () {
        const chart = Highcharts.chart('container', {
            chart: {
                type: 'area',
                contextMenu: {
                    enabled: true  // Bật Context Menu
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
            series: [{
                name: 'Jane',
                data: [1, 0, 4]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    });
    document.addEventListener('DOMContentLoaded', function () {
        // const chart =  Highcharts.chart('container1', {
        //     chart: {
        //         plotBackgroundColor: null,
        //         plotBorderWidth: null,
        //         plotShadow: false,
        //         type: 'pie'
        //       },
        //       title: {
        //         text: 'Browser market shares in May, 2020',
        //         align: 'left'
        //       },
        //       tooltip: {
        //         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        //       },
        //       accessibility: {
        //         point: {
        //           valueSuffix: '%'
        //         }
        //       },
        //       plotOptions: {
        //         pie: {
        //           allowPointSelect: true,
        //           cursor: 'pointer',
        //           dataLabels: {
        //             enabled: true,
        //             format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        //           }
        //         }
        //       },
        //       series: [{
        //         name: 'Brands',
        //         colorByPoint: true,
        //         data: [{
        //           name: 'Chrome',
        //           y: 70.67,
        //           sliced: true,
        //           selected: true
        //         }, {
        //           name: 'Edge',
        //           y: 14.77
        //         },  {
        //           name: 'Firefox',
        //           y: 4.86
        //         }, {
        //           name: 'Safari',
        //           y: 2.63
        //         }, {
        //           name: 'Internet Explorer',
        //           y: 1.53
        //         },  {
        //           name: 'Opera',
        //           y: 1.40
        //         }, {
        //           name: 'Sogou Explorer',
        //           y: 0.84
        //         }, {
        //           name: 'QQ',
        //           y: 0.51
        //         }, {
        //           name: 'Other',
        //           y: 2.6
        //         }]
        //       }]
        //   });
        const chart = Highcharts.chart('container1', {
            chart: {
                type: 'pie',
                contextMenu: {
                    enabled: true  // Bật Context Menu
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
            series: [{
                name: 'Jane',
                data: [1, 0, 4]
            }]
        });
    });

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
                            <button className="dropdown-toggle">Theo ngày</button>
                            <ul className="dropdown-menu">
                                <li><a href="#">Theo ngày</a></li>
                                <li><a href="#">Theo tuần</a></li>
                                <li><a href="#">Theo tháng</a></li>
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
                                    <span>500</span>
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
                                    <span>500</span>
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
                                    <span>500</span>
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
                                    <span>500</span>
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
                                        <span>500</span>
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
                                        <span>500</span>
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
                                        <span>500</span>
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
                                        <span>500</span>
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
