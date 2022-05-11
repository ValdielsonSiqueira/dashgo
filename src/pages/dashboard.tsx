import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
})


export default function Dashboard() {
  const options = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[500]
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray[600]
      },
      axisTick: {
        color: theme.colors.gray[600]
      },
      categories: [
        '2022-03-18T00:00:00Z',
        '2022-03-19T00:00:00Z',
        '2022-03-20T00:00:00Z',
        '2022-03-21T00:00:00Z',
        '2022-03-22T00:00:00Z',
        '2022-03-23T00:00:00Z',
        '2022-03-24T00:00:00Z',
      ]
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    }
  };

  const series = [
    { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }
  ];

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" maxWidth={1480} my="6" mx="auto" px="6">
        <Sidebar />
        <SimpleGrid  align="flex-start" flex="1" gap="4" minChildWidth="320px">
          <Box
           p="8"
           bg="gray.800"
           borderRadius={8}
           pb="4"
          >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Chart options={options} series={series} type="area" height="160" />
          </Box>
          <Box
           p="8"
           bg="gray.800"
           borderRadius={8}
          >
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart options={options} series={series} type="area" height="160" />
          </Box>

        </SimpleGrid>
      </Flex>
    </Flex>
  )
}