"use server"
export const getDeploymentMetrics = async () => {
  const response = await fetch(
    "http://deployer-gateway.prd.unmarshal.com/v1/workload/103a8c56-9019-4786-8bcf-332bd1413a89/details",
  )
  const result = await response.json()
  return result
}
