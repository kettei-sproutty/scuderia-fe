<p align="center">
  <img
    alt="scuderia frontend"
    src="https://github.com/kettei-sproutty/scuderia-fe/tree/main/public/docs/docs-logo.webp"
  >
</p>

<p align="center">
    <a href="https://www.scuderia-fe.com">
    <img
        alt="Production website"
        src="https://img.shields.io/github/deployments/kettei-sproutty/scuderia-fe/Production%20%E2%80%93%20scuderia-frontend?style=for-the-badge&label=Scuderia FE"
      />
    </a>
    <a href="https://storybook.scuderia-fe.com">
      <img
        alt="Production website"
        src="https://img.shields.io/github/deployments/kettei-sproutty/scuderia-fe/Production%20%E2%80%93%20storybook-scuderia-fe?style=for-the-badge&label=Storybook"
      >
  </a>
</p>

#

<p align="center">
  <a href="https://github.com/users/kettei-sproutty/projects/1">Roadmap</a> - <a href="https://github.com/kettei-sproutty/scuderia-fe/blob/main/CHANGELOG.md">Changelog</a> - <a href="https://github.com/kettei-sproutty/scuderia-fe/issues/new?assignees=&labels=bug&template=bug_report.md">Bug reports</a>
</p>

<p align="center">
  <img
    alt="GitHub contributors"
    src="https://img.shields.io/github/contributors/kettei-sproutty/scuderia-fe?style=flat-square"
  >
  <img
    alt="GitHub commit activity"
    src="https://img.shields.io/github/commit-activity/m/kettei-sproutty/scuderia-fe"
  />
</p>

<p align="center">Learn, share, organize.</p>

<p align="center">
  <img
    alt="Install"
    src="https://github.com/kettei-sproutty/scuderia-fe/tree/main/public/docs/docs-install.webp"
  >
</p>

Follow these steps to set up the Scuderia FE project on your system:

1.  **Optional: Install Volta CLI**
    If you haven't already, consider installing Volta CLI for managing Node.js versions. You can find detailed installation instructions at [Volta CLI Installation](https://docs.volta.sh/guide/getting-started).

2.  **Install pnpm**
    You need pnpm to manage dependencies. Use the following command:

    - If using Volta CLI:

    ```sh
    volta install pnpm@8.6.10
    ```

    - Otherwise: Install pnpm globally:

    ```sh
    npm install -g pnpm@8.6.10
    ```

3.  **Install Project Dependencies**
    Run the following command in the project directory:

    ```sh
    pnpm install
    ```

4.  **Create a Supabase Account**
    If you don't have one, create an account on [Supabase](https://supabase.io/) for your project's database.

5.  **Seed the Database**
    Initialize the project's database using Supabase.

    ```sh
    pnpm seed
    ```

6.  **Connect the project with your supabase account** Create a `.env` file and populate

    ```.env
    NEXT_PUBLIC_SUPABASE_URL="your-project-url"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
    ```

7.  **Running the Project**
    Use the following commands to run different aspects of the project:

        - To start the Next.js application:
          ```sh
          pnpm dev
          ```

        - To launch the Storybook environment:
          ```sh
          pnpm storybook
          ```

<p align="center">
  <img
    alt="Contributing"
    src="https://github.com/kettei-sproutty/scuderia-fe/tree/main/public/docs/docs-contributing.webp"
  >
</p>

WIP

<p align="center">
  <img
    alt="Code of conduct"
    src="https://github.com/kettei-sproutty/scuderia-fe/tree/main/public/docs/docs-code-of-conduct.webp"
  >
</p>

WIP
