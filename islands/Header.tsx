export default function Header() {
  const isLoggedIn = localStorage.getItem("user");
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header class="flex justify-between items-center py-6 px-4">
      <div class="text-dark-charcoal text-2xl font-bold">Wikicademy</div>
      <nav>
        <ul class="flex space-x-4" style={
          `
          list-style-type: none;`
        }>
          <li>
            <a href="/" class="text-teal hover:text-warm-beige">
              Home
            </a>
          </li>
          <li>
            <a href="/courses" class="text-dark-charcoal hover:text-teal">
              Courses
            </a>
          </li>
          <li>
            <a href="#" class="text-dark-charcoal hover:text-teal">
              About
            </a>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <a href="/create" class="text-dark-charcoal hover:text-teal">
                  Create
                </a>
              </li>
              <li>
                <button
                  onClick={logout}
                  href="/signin"
                  class="text-dark-charcoal hover:text-teal"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <a href="/signin" class="text-dark-charcoal hover:text-teal">
                Signin
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
