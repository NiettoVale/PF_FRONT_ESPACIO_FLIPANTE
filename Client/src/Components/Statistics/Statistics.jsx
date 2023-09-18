import React, { useState, useEffect } from "react";
import { Chart as ChartJS, LineElement, Tooltip, Legend } from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import moment from "moment";

const back = process.env.REACT_APP_BACK;

Chart.register(...registerables);
ChartJS.register(LineElement, Tooltip, Legend);

const Statistics = () => {
  const [chartData, setChartData] = useState({
    usuariosRegistrados: {
      labels: [],
      datasets: [
        {
          label: "Usuarios Registrados por Mes",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          data: [],
          fill: false,
        },
      ],
    },
    reviews: {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [],
    },
    ventas: {
      labels: [],
      datasets: [
        {
          label: "Ventas",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          data: [],
          fill: false,
        },
      ],
    },
    visitas: {
      labels: [],
      datasets: [
        {
          label: "Visitas",
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 2,
          data: [],
          fill: false,
        },
      ],
    },
    ventasPorCategoria: {
      labels: [],
      datasets: [
        {
          label: "Ventas por Categoría",
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 205, 86, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          borderWidth: 2,
          data: [],
        },
      ],
    },
  });

  const [totalUsuariosRegistrados, setTotalUsuariosRegistrados] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalProductosActivos, setTotalProductosActivos] = useState(0);
  const [totalProductosInactivos, setTotalProductosInactivos] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalVisitas, setTotalVisitas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de usuarios registrados
        const usersResponse = await fetch(`${back}users`);
        const usersData = await usersResponse.json();

        const totalUsuarios = usersData.length;
        setTotalUsuariosRegistrados(totalUsuarios);

        const userCountByMonth = {};
        usersData.forEach((user) => {
          const registrationDate = moment(user.purchaseDate);
          const monthYear = registrationDate.format("MMM YYYY");
          if (userCountByMonth[monthYear]) {
            userCountByMonth[monthYear]++;
          } else {
            userCountByMonth[monthYear] = 1;
          }
        });

        const usuariosRegistradosData = {
          labels: Object.keys(userCountByMonth),
          datasets: [
            {
              label: "Usuarios Registrados por Mes",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              data: Object.values(userCountByMonth),
              fill: false,
            },
          ],
        };

        setChartData((prevChartData) => ({
          ...prevChartData,
          usuariosRegistrados: usuariosRegistradosData,
        }));

        // Obtener datos de revisiones
        const reviewsResponse = await fetch(`${back}reviews`);
        let reviewsData = await reviewsResponse.json();

        const months = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];
        const positiveData = Array.from({ length: 12 }, () => 0);
        const negativeData = Array.from({ length: 12 }, () => 0);

        reviewsData.forEach((review) => {
          const date = new Date(review.PurchaseDate);
          const month = date.getMonth();
          const rating = review.rating;

          if (rating >= 3) {
            positiveData[month]++;
          } else {
            negativeData[month]++;
          }
        });

        reviewsData = {
          labels: months,
          datasets: [
            {
              label: "Comentarios Negativos (1 y 2 estrellas)",
              backgroundColor: "rgba(255, 0, 0, 0.6)",
              borderWidth: 1,
              data: negativeData,
            },
            {
              label: "Comentarios Positivos (3, 4 y 5 estrellas)",
              backgroundColor: "rgba(0, 255, 0, 0.6)",
              borderWidth: 1,
              data: positiveData,
            },
          ],
        };

        setChartData((prevChartData) => ({
          ...prevChartData,
          reviews: reviewsData,
        }));

        // Obtener datos de ventas
        const orderResponse = await fetch(`${back}order`);
        const orderData = await orderResponse.json();

        const totalSales = orderData.length;
        setTotalVentas(totalSales);

        const total = orderData.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
        setTotalIngresos(total);

        const meses = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];
        const ventasPorMes = Array(12).fill(0);

        orderData.forEach((venta) => {
          const fecha = new Date(venta.purchaseDate);
          const mes = fecha.getMonth();
          ventasPorMes[mes] += 1;
        });

        const ventasData = {
          labels: meses,
          datasets: [
            {
              label: "Ventas",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              data: ventasPorMes,
              fill: false,
            },
          ],
        };

        setChartData((prevChartData) => ({
          ...prevChartData,
          ventas: ventasData,
        }));

        const categoryCounts = {};

        orderData.forEach((order) => {
          const category = order.category;
          if (category) {
            if (categoryCounts[category]) {
              categoryCounts[category]++;
            } else {
              categoryCounts[category] = 1;
            }
          }
        });

        // Convertir los datos en un formato adecuado para el gráfico de pastel
        const pieChartData = {
          labels: Object.keys(categoryCounts),
          datasets: [
            {
              data: Object.values(categoryCounts),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 205, 86, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
            },
          ],
        };

        // Actualiza el estado con los datos del gráfico de pastel
        setChartData((prevChartData) => ({
          ...prevChartData,
          ventasPorCategoria: pieChartData,
        }));

        // Obtener datos de visitas
        const visitResponse = await fetch(`${back}visit`);
        const visitData = await visitResponse.json();

        // Procesar los datos de visitas aquí
        // Puedes implementar lógica similar a la de ventas o usuarios registrados

        // para calcular estadísticas relacionadas con las visitas
        setTotalVisitas(visitData[0].count);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener los datos de productos
    const fetchProducts = async () => {
      try {
        const productsResponse = await fetch(`${back}products`);
        const productsData = await productsResponse.json();

        const activeProducts = productsData.filter(
          (product) => product.deleted === false
        );
        const totalActiveProducts = activeProducts.length;
        setTotalProductosActivos(totalActiveProducts);
      } catch (error) {
        console.error("Error al obtener los datos de productos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener los datos de productos
    const fetchDeletedProducts = async () => {
      try {
        const productsDeletedResponse = await fetch(`${back}products-deleted`);
        const productsDeletedData = await productsDeletedResponse.json();

        const inactiveProducts = productsDeletedData.filter(
          (product) => product.deleted === true
        );
        const totalInactiveProducts = inactiveProducts.length;
        setTotalProductosInactivos(totalInactiveProducts);
      } catch (error) {
        console.error("Error al obtener los datos de productos:", error);
      }
    };

    fetchDeletedProducts();
  }, []);

  return (
    <div>
      <h2>Ventas Concretadas: {totalVentas}</h2>
      <h2>Total de Ingresos: ${totalIngresos.toFixed(2)}</h2>
      <h2>Productos Activos: {totalProductosActivos}</h2>
      <h2>Productos Inactivos: {totalProductosInactivos}</h2>
      <h2>Usuarios Registrados: {totalUsuariosRegistrados}</h2>
      <h2>Total de Visitas: {totalVisitas}</h2>
      <div className="chart-container">
        <h2>Estadísticas de Ventas</h2>
        <Line data={chartData.ventas} />
      </div>
      <div className="chart-container">
        <h2>Usuarios Registrados por Mes</h2>
        <Line data={chartData.usuariosRegistrados} />
      </div>
      <div className="chart-container">
        <h2>Revisiones Recibidas</h2>
        <Bar data={chartData.reviews} />
      </div>
      <div className="chart-container">
        <h2>Ventas por Categoría</h2>
        <Pie data={chartData.ventasPorCategoria} />
      </div>
    </div>
  );
};

export default Statistics;
