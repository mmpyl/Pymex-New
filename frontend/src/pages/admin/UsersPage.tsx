import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { usersService } from '../../services/core/users.service';

const initialForm = {
  nombre: '',
  email: '',
  password: '',
  rol: 'empleado',
  empresaId: '',
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await usersService.list({ limit: 50 });
      setUsers(result.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await usersService.create({
        ...form,
        empresaId: form.empresaId ? Number(form.empresaId) : undefined,
      });
      toast.success('Usuario creado');
      setForm(initialForm);
      loadUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const suspendUser = async (id) => {
    try {
      await usersService.suspend(id);
      toast.success('Usuario suspendido');
      loadUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await usersService.remove(id);
      toast.success('Usuario eliminado');
      loadUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold text-slate-900">Módulo de usuarios</h1>
      <p className="mt-2 text-slate-600">Alta, consulta, suspensión y eliminación de usuarios conectadas al API.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-xl bg-white p-5 shadow md:grid-cols-3">
        <input className="rounded border p-2" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
        <input className="rounded border p-2" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="rounded border p-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <select className="rounded border p-2" value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })}>
          {['super_admin', 'admin', 'soporte', 'gerente', 'empleado', 'contador'].map((role) => <option key={role} value={role}>{role}</option>)}
        </select>
        <input className="rounded border p-2" type="number" placeholder="Empresa ID (opcional)" value={form.empresaId} onChange={(e) => setForm({ ...form, empresaId: e.target.value })} />
        <button className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700" type="submit">Crear usuario</button>
      </form>

      <section className="mt-6 rounded-xl bg-white shadow">
        <div className="border-b p-4 font-semibold">Usuarios registrados</div>
        {loading && <p className="p-4">Cargando usuarios...</p>}
        {error && <p className="p-4 text-red-600">{error}</p>}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr><th className="p-3">Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Empresa</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.nombre}</td><td>{user.email}</td><td>{user.rol}</td><td>{user.estado}</td><td>{user.empresaId || '-'}</td>
                  <td className="space-x-2"><button className="text-amber-700" onClick={() => suspendUser(user.id)}>Suspender</button><button className="text-red-700" onClick={() => deleteUser(user.id)}>Eliminar</button></td>
                </tr>
              ))}
              {!loading && users.length === 0 && <tr><td className="p-4 text-slate-500" colSpan="6">No hay usuarios para mostrar.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
