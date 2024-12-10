import { Authenticated, GitHubBanner, Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import dataProvider from '@refinedev/nestjsx-crud';

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { App as AntdApp, Typography } from 'antd';
import { createClient } from 'graphql-ws';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { authProvider } from './authProvider';
import { Header } from './components/header';
import { ColorModeContextProvider } from './contexts/color-mode';
// import {
//   BlogPostCreate,
//   BlogPostEdit,
//   BlogPostList,
//   BlogPostShow,
// } from './pages/blog-posts';
// import {
//   CategoryCreate,
//   CategoryEdit,
//   CategoryList,
//   CategoryShow,
// } from './pages/categories';
import { ForgotPassword } from './pages/forgotPassword';
import { Login } from './pages/login';
import { Register } from './pages/register';
import {
  SiteEdit,
  SiteList,
  SiteCreate,
  SitesShow,
  SiteSettings,
} from './pages/sites';
import { PagesCreate, PagesEdit, PagesList } from './pages/pages';
import { LayoutsCreate, LayoutsEdit, LayoutsList } from './pages/layouts';
import routerProvider from '@refinedev/react-router-v6';
import { PagesList as SitePageList } from './pages/sites';
const API_URL = 'http://localhost:3000';
const WS_URL = 'wss://api.nestjs-query.refine.dev/graphql';
const wsClient = createClient({ url: WS_URL });

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(API_URL)}
                // liveProvider={liveProvider(wsClient)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                  {
                    name: 'sites',
                    list: '/sites',
                    create: '/sites/create',
                    edit: '/sites/edit/:id',
                  },
                  {
                    name: 'pages',
                    list: '/pages',
                    create: '/pages/create',
                    edit: '/pages/edit/:id',
                    // meta: {parent: 'sites'},
                  }, // {
                  //   name: "sitePages"
                  // }
                  {
                    name: 'layouts',
                    list: '/layouts',
                    create: '/layouts/create',
                    edit: '/layouts/edit/:id',
                    // meta: {parent: 'sites'},
                  },
                  // {
                  //   name: 'layouts',
                  //   list: '/layouts',
                  //   create: '/layouts/create',
                  //   edit: '/layouts/edit/:id',
                  // },
                ]}
                options={{
                  syncWithLocation: false,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: 'ruF8wu-N4X4am-hpgDrI',
                  liveMode: 'auto',
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="sites" />}
                    />

                    <Route path="/sites">
                      <Route index element={<SiteList />} />
                      <Route path="create" element={<SiteCreate />} />
                      {/* <Route path="edit/:id/*" element={<SiteEdit />} /> */}
                      {/* <Route path="edit/:id/pages" element={<PagesList/>} /> */}
                      <Route path="edit/:id" element={<SiteEdit />}>
                        <Route index element={<SiteSettings />} />
                        <Route path="pages" element={<SitePageList />} />
                        <Route path="layouts" element={<LayoutsList />} />
                      </Route>
                      <Route path="show/:id" element={<SitesShow />} />
                    </Route>
                    <Route path="/pages">
                      <Route index element={<PagesList />} />
                      <Route path="create" element={<PagesCreate />} />
                      <Route path="edit/:id" element={<PagesEdit />} />
                      {/* <Route path="show/:id" element={<SitesShow />} /> */}
                    </Route>
                    <Route path="/layouts">
                      <Route index element={<LayoutsList />} />
                      <Route path="create" element={<LayoutsCreate />} />
                      <Route path="edit/:id" element={<LayoutsEdit />} />
                      {/* <Route path="show/:id" element={<SitesShow />} /> */}
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
