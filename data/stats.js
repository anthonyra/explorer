import useSWR from 'swr'
import Client from '@helium/http'

export const fetchStats = async () => {
  const client = new Client()
  const stats = await client.stats.get()

  return {
    circulatingSupply: stats.tokenSupply,
    blockTime: stats.blockTimes.lastDay.avg,
    electionTime: stats.electionTimes.lastDay.avg,
    packetsTransferred: stats.stateChannelCounts.lastMonth.numPackets,
    dataCredits: stats.stateChannelCounts.lastMonth.numDcs,
    totalHotspots: stats.counts.hotspots,
    totalBlocks: stats.counts.blocks,
  }
}

export const useStats = (initialData) => {
  const { data, error } = useSWR('stats', fetchStats, {
    initialData,
    refreshInterval: 10000,
  })
  return {
    stats: data,
    isLoading: !error && !data,
    isError: error,
  }
}
