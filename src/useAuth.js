export default function useAuth() {
  const auth = JSON.parse(sessionStorage.getItem('hypervisor-auth'));
  return auth;
}
