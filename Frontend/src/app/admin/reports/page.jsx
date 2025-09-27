'use client';
import React, { useState } from 'react';
import { Download, Search, Flag, Clock, CheckCircle, AlertTriangle, Eye, XCircle, Shield, Zap } from 'lucide-react';

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    { id: 1, post: "Controversial AI Ethics Discussion", reporter: "user_234", reason: "Inappropriate Content", severity: "High", date: "2024-09-27", status: "Pending" },
    { id: 2, post: "Spam Link in Comments", reporter: "moderator_45", reason: "Spam", severity: "Medium", date: "2024-09-26", status: "Resolved" },
    { id: 3, post: "Plagiarized Content", reporter: "user_789", reason: "Copyright", severity: "High", date: "2024-09-25", status: "Under Review" },
    { id: 4, post: "Off-topic Discussion", reporter: "user_123", reason: "Off-topic", severity: "Low", date: "2024-09-24", status: "Dismissed" },
  ];

  const StatusBadge = ({ status }) => {
    const styles = {
      High: 'bg-red-500/20 text-red-400 border-red-500/30',
      Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Low: 'bg-green-500/20 text-green-400 border-green-500/30',
      Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Under Review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
      Dismissed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs border font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const SeverityBadge = ({ severity }) => {
    const styles = {
      High: 'bg-red-600/20 text-red-400',
      Medium: 'bg-yellow-600/20 text-yellow-400',
      Low: 'bg-green-600/20 text-green-400',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[severity]}`}>
        {severity}
      </span>
    );
  };

  const filteredReports = reports.filter(report =>
    report.post.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Content Reports
          </h1>
          <p className="text-gray-400 mt-1">Review and moderate reported content to maintain community standards.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-colors duration-200 flex items-center space-x-2">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Reports', value: '23', color: 'red', icon: Flag },
          { label: 'Pending Review', value: '8', color: 'yellow', icon: Clock },
          { label: 'Resolved', value: '15', color: 'green', icon: CheckCircle },
          { label: 'High Priority', value: '3', color: 'red', icon: AlertTriangle },
        ].map((stat, idx) => (
          <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
              </div>
              <stat.icon className={`text-${stat.color}-400`} size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-purple-300 flex items-center">
            <Zap className="mr-2" size={20} />
            AI-Powered Insights
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-3 hover:bg-yellow-600/20 transition-colors">
            <p className="text-yellow-300 font-medium">⚠️ Repeat Offender Alert</p>
            <p className="text-gray-300 mt-1">User "user_234" has 3 reports in the last week</p>
          </div>
          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3 hover:bg-green-600/20 transition-colors">
            <p className="text-green-300 font-medium">📈 Report Trend</p>
            <p className="text-gray-300 mt-1">Spam reports decreased by 40% this month</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg">
          <option>All Severity</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="px-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg">
          <option>All Status</option>
          <option>Pending</option>
          <option>Under Review</option>
          <option>Resolved</option>
          <option>Dismissed</option>
        </select>
      </div>

      {/* Reports Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700/30">
              <tr>
                <th className="p-4 font-semibold text-gray-300">Post</th>
                <th className="p-4 font-semibold text-gray-300">Reporter</th>
                <th className="p-4 font-semibold text-gray-300">Reason</th>
                <th className="p-4 font-semibold text-gray-300">Severity</th>
                <th className="p-4 font-semibold text-gray-300">Date</th>
                <th className="p-4 font-semibold text-gray-300">Status</th>
                <th className="p-4 font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => (
                <tr key={report.id} className="border-b border-gray-700/50 hover:bg-gray-700/40 transition-colors">
                  <td className="p-4 font-medium text-gray-200">{report.post}</td>
                  <td className="p-4 text-gray-400">{report.reporter}</td>
                  <td className="p-4 text-gray-400">{report.reason}</td>
                  <td className="p-4"><SeverityBadge severity={report.severity} /></td>
                  <td className="p-4 text-gray-400">{report.date}</td>
                  <td className="p-4"><StatusBadge status={report.status} /></td>
                  <td className="p-4 flex gap-2">
                    <button className="p-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-lg transition-colors text-white">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 bg-green-500/30 hover:bg-green-500/50 rounded-lg transition-colors text-white">
                      <CheckCircle size={16} />
                    </button>
                    <button className="p-2 bg-red-500/30 hover:bg-red-500/50 rounded-lg transition-colors text-white">
                      <XCircle size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
