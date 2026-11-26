import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User as UserIcon, RefreshCw } from 'lucide-react';
import API_BASE_URL from '../../config/api';

interface DbUser {
  _id: string;
  username: string;
  fullName?: string;
  email: string;
  role?: string;
  google_id?: string;
  createdAt?: string;
}

export function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<DbUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken') || '';
      const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login', { replace: true });
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      (u.username || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.fullName || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 text-[#e8e8e8]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="nv-section-label">Directory</span>
          <h1 className="font-['Syne'] text-3xl font-bold text-white">Registered Users ({users.length})</h1>
          <p className="text-sm text-[#888888] mt-1">Accounts created via Email or Google Sign-In</p>
        </div>
        <button
          type="button"
          onClick={loadUsers}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold flex items-center gap-2 text-white"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#888888]" />
        <input
          type="text"
          placeholder="Search users by name, email, or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-sm text-white placeholder-[#666666] focus:outline-none focus:border-white/30"
        />
      </div>

      <div className="bg-[#141414] rounded-2xl border border-white/[0.08] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 text-[#888888] uppercase">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Auth Method</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-[#888888]">
                  {loading ? 'Loading users...' : 'No matching users found.'}
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u._id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{u.fullName || u.username}</div>
                        <div className="text-[#888888]">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#cccccc]">
                    {u.google_id ? 'Google OAuth' : 'Email & Password'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#4f7fff]/15 text-[#8bb4ff] font-semibold uppercase text-[10px]">
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#888888]">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
