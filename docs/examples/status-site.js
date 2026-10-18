/* Static, fictional data. No requests, subscriptions, or persisted input. */
window.statusSite = function () {
  const requestedMonth = new URLSearchParams(window.location.search).get('month');
  return {
    historyMonth: ['2026-10', '2026-09'].includes(requestedMonth) ? requestedMonth : '2026-10',
    monthOptions: [
      { value: '2026-10', label: 'October 2026' },
      { value: '2026-09', label: 'September 2026' }
    ],
    incidents: [
      {
        id: 'webhook-delays',
        title: 'Delayed webhook delivery',
        date: '2026-10-15',
        status: 'Resolved',
        impact: 'Partial outage',
        duration: '25 minutes',
        services: ['Webhooks'],
        summary: 'A queue partition delayed webhook delivery. All events were delivered; none were lost.',
        updates: [
          { state: 'Resolved', at: '2026-10-15T18:56:00Z', label: 'Oct 15, 18:56 UTC', body: 'The backlog has cleared and webhook delivery is operating normally. All events were delivered; none were lost.' },
          { state: 'Monitoring', at: '2026-10-15T18:53:00Z', label: 'Oct 15, 18:53 UTC', body: 'The affected partition has recovered. We are monitoring delivery as the remaining backlog drains.' },
          { state: 'Identified', at: '2026-10-15T18:40:00Z', label: 'Oct 15, 18:40 UTC', body: 'A queue partition is delaying webhook delivery. We are moving queued events to healthy workers.' },
          { state: 'Investigating', at: '2026-10-15T18:31:00Z', label: 'Oct 15, 18:31 UTC', body: 'We are investigating delayed webhook deliveries. Other services remain operational.' }
        ]
      },
      {
        id: 'api-errors',
        title: 'Elevated API error rates',
        date: '2026-10-12',
        status: 'Resolved',
        impact: 'Degraded performance',
        duration: '50 minutes',
        services: ['API'],
        summary: 'A database connection pool reached capacity. Traffic was rerouted and error rates returned to normal.',
        updates: [
          { state: 'Resolved', at: '2026-10-12T12:41:00Z', label: 'Oct 12, 12:41 UTC', body: 'API error rates have returned to normal. Traffic is stable following the reroute.' },
          { state: 'Monitoring', at: '2026-10-12T12:30:00Z', label: 'Oct 12, 12:30 UTC', body: 'Traffic has been rerouted to healthy capacity. We are monitoring API recovery.' },
          { state: 'Identified', at: '2026-10-12T12:05:00Z', label: 'Oct 12, 12:05 UTC', body: 'A database connection pool has reached capacity. We are rerouting affected API traffic.' },
          { state: 'Investigating', at: '2026-10-12T11:51:00Z', label: 'Oct 12, 11:51 UTC', body: 'We are investigating elevated API error rates. Some requests may fail or require a retry.' }
        ]
      },
      {
        id: 'search-latency',
        title: 'Elevated search latency',
        date: '2026-09-28',
        status: 'Resolved',
        impact: 'Degraded performance',
        duration: '22 minutes',
        services: ['Search'],
        summary: 'A cache rollout increased query latency in the EU region. The rollout was reverted.',
        updates: [
          { state: 'Resolved', at: '2026-09-28T09:32:00Z', label: 'Sep 28, 09:32 UTC', body: 'Search latency has returned to normal in the EU region after reverting the cache rollout.' },
          { state: 'Monitoring', at: '2026-09-28T09:25:00Z', label: 'Sep 28, 09:25 UTC', body: 'The cache rollout has been reverted. We are monitoring query latency in the EU region.' },
          { state: 'Identified', at: '2026-09-28T09:18:00Z', label: 'Sep 28, 09:18 UTC', body: 'A cache rollout is increasing EU query latency. We are reverting the change.' },
          { state: 'Investigating', at: '2026-09-28T09:10:00Z', label: 'Sep 28, 09:10 UTC', body: 'We are investigating elevated search latency in the EU region.' }
        ]
      }
    ],
    services: [
      { name: 'API', uptime: '99.96', incidentId: 'api-errors', incidentDay: '2026-10-12', severity: 'warning', incidentLabel: 'Oct 12 · Degraded performance · 50 minutes' },
      { name: 'Console', uptime: '100', incidentId: '' },
      { name: 'Webhooks', uptime: '99.98', incidentId: 'webhook-delays', incidentDay: '2026-10-15', severity: 'danger', incidentLabel: 'Oct 15 · Partial outage · 25 minutes' },
      { name: 'Search', uptime: '99.98', incidentId: 'search-latency', incidentDay: '2026-09-28', severity: 'warning', incidentLabel: 'Sep 28 · Degraded performance · 22 minutes' },
      { name: 'Storage', uptime: '100', incidentId: '' }
    ],
    days: Array.from({ length: 90 }, function (_, index) {
      return new Date(Date.UTC(2026, 6, 21 + index)).toISOString().slice(0, 10);
    }),
    get filteredIncidents() {
      return this.incidents.filter(incident => incident.date.startsWith(this.historyMonth));
    },
    get selectedIncident() {
      const id = new URLSearchParams(window.location.search).get('id');
      return this.incidents.find(incident => incident.id === id) || this.incidents[0];
    },
    monthLabel(value) {
      const month = this.monthOptions.find(option => option.value === value);
      return month ? month.label : value;
    },
    dayClass(service, day) {
      return service.incidentDay === day ? 'uptime-day-' + service.severity : '';
    }
  };
};

document.addEventListener('alpine:init', function () {
  window.Alpine.data('statusSite', window.statusSite);
});
