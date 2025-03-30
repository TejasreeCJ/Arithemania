import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LVSimulation from './components/LVSimulation';
import './TigerReserveDashboard.css';
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Import reserve images
import bandipurImg from './assets/bandipur.jpeg';
import periyarImg from './assets/periyar.jpeg';
import nsrImg from './assets/nsr.jpeg';
import kmtImg from './assets/kmt.jpeg';
import bhadraImg from './assets/bhadra.jpeg';
import anamalaiImg from './assets/anamalai.jpeg';
import kaliImg from './assets/kali.jpeg';
import mudumalaiImg from './assets/mudumalai.jpeg';
import nagarholeImg from './assets/nagarhole.jpeg';
import parambikulamImg from './assets/parambikulam.jpeg';
import brtImg from './assets/brt.jpeg';
import kawalImg from './assets/kawal.jpeg';
import satyamangalamImg from './assets/sathyamangalam.jpeg';

const TigerReserveDashboard = () => {
  const [activeReserve, setActiveReserve] = useState('Bandipur');
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [simulationData, setSimulationData] = useState([]);
  const mapRef = useRef(null);

  // Complete tiger reserve data with all provided information
  const reserves = [
    {
      id: 1,
      name: 'Bandipur',
      image: bandipurImg,
      region: 'Karnataka',
      coreArea: 872.24,
      bufferArea: 1155.57,
      totalArea: 2007.81,
      tigerDensity: 11,
      notes: 'Contiguous with Nagarahole, Wayanad, and Mudumalai reserves.',
      latMin: 11.59277778,
      lonMin: 76.20472222,
      latMax: 11.91722222,
      lonMax: 76.85888889,
    },
    {
      id: 2,
      name: 'Periyar',
      image: periyarImg,
      region: 'Kerala',
      coreArea: 881,
      bufferArea: 148,
      totalArea: 1029,
      tigerDensity: 46,
      notes: 'Known for significant biodiversity.',
      latMin: 9.2989,
      lonMin: 76.9367,
      latMax: 9.6195,
      lonMax: 77.4182,
    },
    {
      id: 3,
      name: 'Nagarjunsagar-Srisailam',
      image: nsrImg,
      region: 'Andhra Pradesh/Telangana',
      coreArea: 2444,
      bufferArea: 1160,
      totalArea: 3604,
      tigerDensity: 60,
      notes: 'Largest tiger reserve in India, spanning Andhra Pradesh and Telangana.',
      latMin: 15.3957,
      lonMin: 78.6337,
      latMax: 16.7101,
      lonMax: 79.4238,
    },
    {
      id: 4,
      name: 'Kalakad Mundanthurai',
      image: kmtImg,
      region: 'Tamil Nadu',
      coreArea: 895,
      bufferArea: 706.542,
      totalArea: 1601.542,
      tigerDensity: 16.5,
      notes: 'Part of the Agasthyamalai Biosphere Reserve.',
      latMin: 8.41666667,
      lonMin: 77.16666667,
      latMax: 8.88333333,
      lonMax: 77.58333333,
    },
    {
      id: 5,
      name: 'Bhadra',
      image: bhadraImg,
      region: 'Karnataka',
      coreArea: 492.46,
      bufferArea: 155.67,
      totalArea: 648.13,
      tigerDensity: 22.5,
      notes: 'Known for rich flora and fauna.',
      latMin: 13.41666667,
      lonMin: 75.25,
      latMax: 13.83333333,
      lonMax: 75.83333333,
    },
    {
      id: 6,
      name: 'Anamalai',
      image: anamalaiImg,
      region: 'Tamil Nadu',
      coreArea: 958,
      bufferArea: 521,
      totalArea: 1479,
      tigerDensity: 15,
      notes: 'Part of the Western Ghats.',
      latMin: 10.21722222,
      lonMin: 76.8175,
      latMax: 10.55083333,
      lonMax: 77.35111111,
    },
    {
      id: 7,
      name: 'Kali',
      image: kaliImg,
      region: 'Karnataka',
      coreArea: 1220.18,
      bufferArea: 1474.62,
      totalArea: 2694.8,
      tigerDensity: 39,
      notes: 'Formerly known as Dandeli-Anshi.',
      latMin: 14.9564,
      lonMin: 74.2521,
      latMax: 15.1656,
      lonMax: 74.7196,
    },
    {
      id: 8,
      name: 'Mudumalai',
      image: mudumalaiImg,
      region: 'Tamil Nadu',
      coreArea: 321,
      bufferArea: 367.59,
      totalArea: 688.59,
      tigerDensity: 11,
      notes: 'Part of the Nilgiri Biosphere Reserve.',
      latMin: 11.53171944,
      lonMin: 76.35802778,
      latMax: 11.70513889,
      lonMax: 76.75597222,
    },
    {
      id: 9,
      name: 'Nagarhole',
      image: nagarholeImg,
      region: 'Karnataka',
      coreArea: 643.35,
      bufferArea: 562.41,
      totalArea: 1205.76,
      tigerDensity: 12,
      notes: 'High tiger density; contiguous with Bandipur, Mudumalai, Wayanad, and Biligiri Rangana Betta reserves.',
      latMin: 11.75,
      lonMin: 76.08333333,
      latMax: 12.25,
      lonMax: 76.41666667,
    },
    {
      id: 10,
      name: 'Parambikulam',
      image: parambikulamImg,
      region: 'Kerala',
      coreArea: 390.89,
      bufferArea: 252.77,
      totalArea: 643.66,
      tigerDensity: 18.5,
      notes: 'Part of the Anamalai-Nelliyampathy landscape.',
      latMin: 10.33333333,
      lonMin: 76.58333333,
      latMax: 10.43333333,
      lonMax: 76.83333333,
    },
    {
      id: 11,
      name: 'Biligiri Ranganatha Temple',
      image: brtImg,
      region: 'Karnataka',
      coreArea: 359.1,
      bufferArea: 215.72,
      totalArea: 574.82,
      tigerDensity: 9,
      notes: 'Connects Eastern and Western Ghats.',
      latMin: 11.71666667,
      lonMin: 77.01666667,
      latMax: 12.15,
      lonMax: 77.25,
    },
    {
      id: 12,
      name: 'Kawal',
      image: kawalImg,
      region: 'Telangana',
      coreArea: 892.23,
      bufferArea: 123.12,
      totalArea: 1015.35,
      tigerDensity: 'Undetermined',
      notes: 'Potential to support higher tiger populations with improved conservation efforts.',
      latMin: 18.98333333,
      lonMin: 79.25,
      latMax: 19.46666667,
      lonMax: 79.46666667,
    },
    {
      id: 13,
      name: 'Sathyamangalam',
      image: satyamangalamImg,
      region: 'Tamil Nadu',
      coreArea: 793.493,
      bufferArea: 614.912,
      totalArea: 1408.405,
      tigerDensity: 'Undetermined',
      notes: 'Connects Eastern and Western Ghats.',
      latMin: 11.4875,
      lonMin: 76.83333333,
      latMax: 11.8,
      lonMax: 77.45611111,
    },
  ];

  // Lotka-Volterra simulation parameters with more realistic values
  const alpha = 0.3; // prey growth rate (reduced to reflect slower reproduction)
  const beta = 0.01; // predation rate (reduced to reflect lower predation efficiency)
  const delta = 0.1; // predator death rate (reduced to reflect longer tiger lifespan)
  const gamma = 0.001; // predator growth rate (reduced to reflect slower tiger reproduction)
  const r = 0.1; // NDVI growth rate (reduced to reflect slower vegetation growth)
  const K = 0.8; // NDVI carrying capacity (reduced to reflect typical forest coverage)
  const c = 0.05; // vegetation consumption rate by prey (reduced to reflect lower impact)

  // Generate simulation data using modified Lotka-Volterra equations
  const generateSimulationData = (reserve) => {
    // ... (your generateSimulationData function)
    const tigerDensity = typeof reserve.tigerDensity === 'number' ? reserve.tigerDensity : 10;
    const data = [];
    const timeSteps = 100;
    const dt = 1; // Time step in months

    // Initial conditions based on reserve characteristics
    // Scale initial populations based on reserve area and tiger density
    const areaFactor = reserve.totalArea / 1000; // Normalize by 1000 sq km
    let prey = Math.min(5000, Math.max(1000, areaFactor * 1000)); // Base prey population
    let predator = Math.min(100, Math.max(10, tigerDensity * 2)); // Base tiger population
    let ndvi = Math.min(0.8, Math.max(0.3, tigerDensity / 50)); // Initial vegetation index

    // Adjust initial conditions based on reserve characteristics
    if (reserve.coreArea > 1000) {
      prey *= 1.2; // Larger core area supports more prey
    }
    if (reserve.bufferArea > 500) {
      prey *= 1.1; // Larger buffer area provides additional habitat
    }

    for (let t = 0; t < timeSteps; t++) {
      // Modified Lotka-Volterra equations with density dependence
      const preyGrowth = alpha * prey * (1 - prey / (5000 * areaFactor));
      const preyDeath = beta * prey * predator;
      const predatorGrowth = gamma * predator * prey;
      const predatorDeath = delta * predator;

      // NDVI logistic growth with seasonal variation and consumption
      const seasonalFactor = 0.1 * Math.sin(2 * Math.PI * t / 12); // Seasonal variation
      const ndviGrowth = r * ndvi * (1 - ndvi / K) + seasonalFactor;
      const ndviConsumption = c * ndvi * prey;

      // Update populations with improved stability
      prey += (preyGrowth - preyDeath) * dt;
      predator += (predatorGrowth - predatorDeath) * dt;
      ndvi += (ndviGrowth - ndviConsumption) * dt;

      // Ensure values stay within reasonable bounds
      prey = Math.max(100, prey);
      predator = Math.max(1, predator);
      ndvi = Math.max(0.2, Math.min(1, ndvi));

      // Add some stochastic variation
      prey *= (1 + (Math.random() - 0.5) * 0.1);
      predator *= (1 + (Math.random() - 0.5) * 0.05);
      ndvi *= (1 + (Math.random() - 0.5) * 0.02);

      data.push({
        time: t * dt,
        prey: Math.round(prey),
        predator: Math.round(predator),
        ndvi: Number(ndvi.toFixed(2)),
      });
    }

    return data;
  };

  // Generate spatial distribution data
  const generateSpatialData = (reserve) => {
    // ... (your generateSpatialData function)
    const tigerDensity = typeof reserve.tigerDensity === 'number' ? reserve.tigerDensity : 10;
    const areaFactor = reserve.totalArea / 1000;

    // Generate NDVI distribution (0-1 scale)
    const ndviData = {
      high: Math.min(0.8, Math.max(0.6, tigerDensity / 50)),
      medium: Math.min(0.6, Math.max(0.4, tigerDensity / 70)),
      low: Math.min(0.4, Math.max(0.2, tigerDensity / 100)),
    };

    // Generate prey density (per sq km)
    const basePreyDensity = Math.min(50, Math.max(20, areaFactor * 10));
    const preyData = {
      high: Math.min(60, Math.max(40, basePreyDensity * 1.2)),
      medium: Math.min(40, Math.max(20, basePreyDensity)),
      low: Math.min(20, Math.max(10, basePreyDensity * 0.8)),
    };

    // Generate predator density (per 100 sq km)
    const predatorData = {
      high: Math.min(40, Math.max(20, tigerDensity * 1.2)),
      medium: Math.min(20, Math.max(10, tigerDensity)),
      low: Math.min(10, Math.max(5, tigerDensity * 0.8)),
    };

    return {
      ndvi: ndviData,
      prey: preyData,
      predator: predatorData,
    };
  };

  // Update simulation data when active reserve changes
  useEffect(() => {
    const activeReserveInfo = reserves.find((r) => r.name === activeReserve);
    const newData = generateSimulationData(activeReserveInfo);
    setSimulationData(newData);
  }, [activeReserve]);

  const activeReserveInfo = reserves.find((r) => r.name === activeReserve);
  const spatialData = generateSpatialData(activeReserveInfo);

  // Ecological insights based on reserve characteristics
  const getReserveInsights = (reserve) => {
    // ... (your getReserveInsights function)
    const tigerDensity = typeof reserve.tigerDensity === 'number' ? reserve.tigerDensity : 'Undetermined';
    const coreToBufferRatio = reserve.coreArea / (reserve.bufferArea || 1);

    let insights = {
      description: `${reserve.name} Tiger Reserve is located in ${reserve.region} with a total area of ${reserve.totalArea} sq km.`,
      status: `Tiger density: ${tigerDensity} per 100 sq km. Core area: ${reserve.coreArea} sq km. Buffer zone: ${reserve.bufferArea} sq km.`,
      insights: [],
    };

    // Generate insights based on reserve data
    if (tigerDensity > 30) {
      insights.insights.push('High tiger density suggests excellent prey base and habitat management.');
    } else if (tigerDensity < 10) {
      insights.insights.push('Lower tiger density indicates potential for habitat improvement and anti-poaching measures.');
    }

    if (coreToBufferRatio > 1.5) {
      insights.insights.push('Large core area relative to buffer zone may provide better protection for tigers.');
    } else if (coreToBufferRatio < 0.5) {
      insights.insights.push('Small core area relative to buffer zone may increase human-wildlife conflict.');
    }

    if (reserve.totalArea > 2000) {
      insights.insights.push('Large reserve area supports greater biodiversity and ecosystem resilience.');
    }

    // Add reserve-specific notes
    insights.insights.push(reserve.notes);

    return insights;
  };

  const reserveInsights = getReserveInsights(activeReserveInfo);

  // Generate conservation recommendations based on reserve characteristics
  const generateConservationRecommendations = (reserve, spatialData) => {
    // ... (your generateConservationRecommendations function)
    const tigerDensity = typeof reserve.tigerDensity === 'number' ? reserve.tigerDensity : 10;
    const coreToBufferRatio = reserve.coreArea / (reserve.bufferArea || 1);
    const recommendations = [];

    // Habitat Management Recommendations
    if (spatialData.ndvi.low < 0.4) {
      recommendations.push({
        priority: 'high',
        text: 'Implement habitat restoration programs to improve vegetation cover',
      });
    }
    if (reserve.coreArea < 500) {
      recommendations.push({
        priority: 'high',
        text: 'Expand core area to provide better protection for tiger populations',
      });
    }

    // Prey Base Management
    if (spatialData.prey.low < 15) {
      recommendations.push({
        priority: 'high',
        text: 'Enhance prey base through habitat improvement and water management',
      });
    }
    if (spatialData.prey.medium < 25) {
      recommendations.push({
        priority: 'medium',
        text: 'Monitor and manage prey population dynamics',
      });
    }

    // Tiger Population Management
    if (tigerDensity < 10) {
      recommendations.push({
        priority: 'high',
        text: 'Strengthen anti-poaching measures and habitat protection',
      });
    }
    if (tigerDensity > 40) {
      recommendations.push({
        priority: 'medium',
        text: 'Consider translocation to maintain optimal tiger density',
      });
    }

    // Buffer Zone Management
    if (coreToBufferRatio < 0.5) {
      recommendations.push({
        priority: 'high',
        text: 'Improve buffer zone management to reduce human-wildlife conflict',
      });
    }
    if (reserve.bufferArea < 300) {
      recommendations.push({
        priority: 'medium',
        text: 'Expand buffer zone to provide better habitat connectivity',
      });
    }

    // Connectivity Recommendations
    if (reserve.notes.includes('contiguous') || reserve.notes.includes('connects')) {
      recommendations.push({
        priority: 'medium',
        text: 'Maintain and enhance corridor connectivity with neighboring reserves',
      });
    }

    // Area-specific Recommendations
    if (reserve.totalArea > 2000) {
      recommendations.push({
        priority: 'low',
        text: 'Implement zone-based management for better resource allocation',
      });
    }
    if (reserve.totalArea < 1000) {
      recommendations.push({
        priority: 'medium',
        text: 'Focus on habitat quality improvement within limited area',
      });
    }

    // Sort recommendations by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return recommendations;
  };

  function MapZoom({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  }

  const getReservePolygon = (reserve) => {
    if (!reserve) return [];

    const latMin = reserve.latMin;
    const lonMin = reserve.lonMin;
    const latMax = reserve.latMax;
    const lonMax = reserve.lonMax;

    return [
      [latMin, lonMin],
      [latMax, lonMin],
      [latMax, lonMax],
      [latMin, lonMax],
      [latMin, lonMin],
    ];
  };

  const reservePolygon = getReservePolygon(activeReserveInfo);

  return (
    <div className="dashboard-container">
      {/* Header with title */}
      <header className="dashboard-header">
        <h1 className="header-title">Tiger Reserve Eco-Balance Dashboard</h1>
        <p className="header-subtitle">Predator-Prey Dynamics & NDVI Analysis</p>
      </header>

      {/* Main content area */}
      <div className="main-content">
        {/* Side navigation with reserve tabs */}
        <div className="side-nav">
          {reserves.map((reserve) => (
            <div
              key={reserve.id}
              className={`reserve-tab ${activeReserve === reserve.name ? 'active' : ''}`}
              onClick={() => setActiveReserve(reserve.name)}
            >
              <img src={reserve.image} alt={reserve.name} className="reserve-image" />
              <p className={`reserve-name ${activeReserve === reserve.name ? 'text-green' : ''}`}>
                {reserve.name.length > 10 ? reserve.name.substring(0, 9) + '...' : reserve.name}
              </p>
            </div>
          ))}
        </div>

        {/* Main visualization area */}
        <div className="main-visualization">
          {/* Map and visualization area */}
          <div className="visualization-content">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{activeReserve} Tiger Reserve</h2>
              <p className="text-gray-600 mb-4">{reserveInsights.description}</p>

              {/* Reserve status overview */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                <h3 className="font-semibold text-green-800">Current Status:</h3>
                <p className="text-gray-700">{reserveInsights.status}</p>
              </div>

              <div style={{ height: '300px', width: '100%' }}>
                <MapContainer
                  center={[
                    (activeReserveInfo.latMin + activeReserveInfo.latMax) / 2,
                    (activeReserveInfo.lonMin + activeReserveInfo.lonMax) / 2,
                  ]}
                  zoom={8}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Polygon 
  positions={reservePolygon} 
  color="red" 
  eventHandlers={{
    click: () => window.open(
      `https://arithmania.vercel.app?lat=${(activeReserveInfo.latMin + activeReserveInfo.latMax) / 2}&lon=${(activeReserveInfo.lonMin + activeReserveInfo.lonMax) / 2}&name=${encodeURIComponent(activeReserveInfo.name)}`
    )
  }}
  style={{ cursor: 'pointer' }}
/>

                  <MapZoom center={[
                    (activeReserveInfo.latMin + activeReserveInfo.latMax) / 2,
                    (activeReserveInfo.lonMin + activeReserveInfo.lonMax) / 2,
                  ]} zoom={8} />
                </MapContainer>
              </div>

              {/* NDVI and Population Trends */}
              <h3 className="text-lg font-bold text-gray-800 mb-3">Ecological Simulation</h3>
              <div className="chart-container">
                <LVSimulation reserveData={simulationData} width={800} height={400} />
              </div>

              {/* Spatial Distribution Visualization */}
              <h3 className="text-lg font-bold text-gray-800 mb-3">Spatial Distribution</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="insight-card">
                  <h4 className="text-sm font-semibold text-center mb-2">NDVI Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">High:</span>
                      <span className="font-semibold">{(spatialData.ndvi.high * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medium:</span>
                      <span className="font-semibold">{(spatialData.ndvi.medium * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Low:</span>
                      <span className="font-semibold">{(spatialData.ndvi.low * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                <div className="insight-card">
                  <h4 className="text-sm font-semibold text-center mb-2">Prey Density (per sq km)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">High:</span>
                      <span className="font-semibold">{spatialData.prey.high.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medium:</span>
                      <span className="font-semibold">{spatialData.prey.medium.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Low:</span>
                      <span className="font-semibold">{spatialData.prey.low.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="insight-card">
                  <h4 className="text-sm font-semibold text-center mb-2">Predator Density (per 100 sq km)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">High:</span>
                      <span className="font-semibold">{spatialData.predator.high.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medium:</span>
                      <span className="font-semibold">{spatialData.predator.medium.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Low:</span>
                      <span className="font-semibold">{spatialData.predator.low.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">VR Simulation</h3>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => window.open('https://arithmania.vercel.app')}
              >
                View Simulation
              </button>
            </div>
          </div>

          {/* Side panel for detailed insights */}
          {showSidePanel && (
            <div className="side-panel">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">Ecological Insights</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowSidePanel(false)}>
                  ✕
                </button>
              </div>

              {/* Reserve key metrics */}
              <div className="insight-card">
                <h4 className="insight-title">Key Metrics</h4>
                <ul className="insight-list">
                  <li className="insight-item">
                    <span>Tiger Density:</span>
                    <span className="font-semibold">{activeReserveInfo.tigerDensity} per 100 sq km</span>
                  </li>
                  <li className="insight-item">
                    <span>Total Area:</span>
                    <span className="font-semibold">{activeReserveInfo.totalArea} sq km</span>
                  </li>
                  <li className="insight-item">
                    <span>Core Area:</span>
                    <span className="font-semibold">{activeReserveInfo.coreArea} sq km</span>
                  </li>
                  <li className="insight-item">
                    <span>Buffer Area:</span>
                    <span className="font-semibold">{activeReserveInfo.bufferArea} sq km</span>
                  </li>
                </ul>
              </div>

              {/* Ecological insights */}
              <div className="insight-card">
                <h4 className="insight-title">Notes</h4>
                <ul className="insight-list">
                  {reserveInsights.insights.map((insight, index) => (
                    <li key={index} className="insight-item">
                      <span className="text-green mr-2">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conservation recommendations */}
              <div className="insight-card">
                <h4 className="insight-title">Conservation Recommendations</h4>
                <ul className="insight-list">
                  {generateConservationRecommendations(activeReserveInfo, spatialData).map((rec, index) => (
                    <li key={index} className="insight-item">
                      <span
                        className={`mr-2 ${
                          rec.priority === 'high' ? 'text-red' : rec.priority === 'medium' ? 'text-amber' : 'text-green'
                        }`}
                      >
                        •
                      </span>
                      <span>{rec.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Toggle button for side panel when collapsed */}
          {!showSidePanel && (
            <button className="panel-toggle" onClick={() => setShowSidePanel(true)}>
              ≡
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TigerReserveDashboard;
