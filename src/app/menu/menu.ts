import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Apps & Pages
  {
    id: 'apps',
    type: 'section',
    title: '',
    icon: 'package',
    children: [
      //Menus for Tenant Admin Portal
      {
        id: 'analytics',
        title: 'TA Dashboard',
        type: 'item',       
        icon: 'home',
        url: 'dashboard/analytics',
        isforTenant:true,
        moduleName:"Pages.Dashboard",
      },
      {
        id: 'jobTask',
        title: 'Job Tasks',
        type: 'item',       
        icon: 'home',
        url: 'apps/job/list',
        isforTenant:true,
        moduleName:"Pages.Dashboard",
      },
      // {
      //   id: 'ManageShifts',
      //   title: 'Manage Shifts',
      //   type: 'item',
      //   icon: 'server',
      //   url: 'apps/shift/list',
      //   isforTenant:true,
      //   moduleName:"Pages.Shifts",
      // },
      // {
      //   id: 'Technicians',
      //   title: 'Technicians',
      //   type: 'collapsible',
      //   icon: 'airplay',
      //   isforTenant:true,
      //   moduleName:"Pages.Technician",
      //   children: [
      //     {
      //       id: 'manage-technicians',
      //       title: 'Manage Technicians',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/technician/list'
      //     },
      //     {
      //       id: 'manage-technicians',
      //       title: 'Technicians Types',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/technician/types'
      //     },
      //     {
      //       id: 'manage-crewgroup',
      //       title: 'Crew Group',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/technician/crewgroup'
      //     },
      //     {
      //       id: 'manage-servicearea',
      //       title: 'Service Area',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/technician/servicearea'
      //     },
      //   ]
      //   },
      //   {
      //     id: 'manage-payables',
      //     title: 'Pay Managment',
      //     type: 'item',
      //     icon: 'dollar-sign',
      //     url: 'apps/paybales/list',
      //     isforTenant:true,
      //     moduleName:"Pages.Payables",
      //   },
      //   {
      //     id: 'services-management',
      //     title: 'Manage Services',
      //     type: 'collapsible',
      //     icon: 'anchor',
      //     isforTenant:true,
      //     moduleName:"Pages.Services",
      //     children: [
      //       {
      //         id: 'diagnostic-services',
      //         title: 'Diagnostic Services',
      //         type: 'item',
      //         icon: 'circle',
      //         url: 'apps/service/diagnostic-services/list'
      //       },
      //       {
      //         id: 'diagnostic-service-types',
      //         title: 'Diagnostic Service Types',
      //         type: 'item',
      //         icon: 'circle',
      //         url: 'apps/service/diagnosticServiceType/list'
      //       },

      //       {
      //         id: 'repair-services',
      //         title: 'Repair Services',
      //         type: 'item',
      //         icon: 'circle',
      //         url: 'apps/service/repair-services/list'
      //       },
      //       {
      //         id: 'repair-service-types',
      //         title: 'Repair Service Types',
      //         type: 'item',
      //         icon: 'circle',
      //         url: 'apps/service/repairServiceType/list'
      //       },

      //       {
      //         id: 'waranty-claim-services',
      //         title: 'Warranty Claim Services',
      //         type: 'item',
      //         icon: 'circle',
      //         url: 'apps/service/warranty-services/list'
      //       },
      //       {
      //         id: 'warranty-service-types',
      //         title: 'Warranty Service Types',
      //         type: 'item',
      //         icon: 'circle',
      //         url: 'apps/service/warrantyClaimServiceType/list'
      //       },
      //     ]
      //     },
      //     {
      //       id: 'parts-management',
      //       title: 'Manage Parts',
      //       type: 'collapsible',
      //       icon: 'figma',
      //       isforTenant:true,
      //       moduleName:"Pages.Parts",
      //       children: [
      //         {
      //           id: 'manage-part',
      //           title: 'Manage Parts',
      //           type: 'item',
      //           icon: 'circle',
      //           url: 'apps/parts/list'
      //         },
      //         {
      //           id: 'part-types',
      //           title: 'Manage Part Types',
      //           type: 'item',
      //           icon: 'circle',
      //           url: 'apps/parts/parttype/list'
      //         },
      //        ]
      // },
      // {
      //         id: 'service-contracts',
      //         title: 'Service Contracts',
      //         type: 'collapsible',
      //         icon: 'file-text',
      //         isforTenant:true,
      //         moduleName:"Pages.Contracts",
      //         children: [
      //           {
      //             id: 'manage-service-contracts',
      //             title: 'Service Contracts',
      //             type: 'item',
      //             icon: 'circle',
      //             url: 'apps/servicecontracts/list'
      //           },
      //           {
      //             id: 'service-contract-types',
      //             title: 'Service Contract Types',
      //             type: 'item',
      //             icon: 'circle',
      //             url: 'apps/servicecontracts/serviceContractType/list'
      //           },
      //          ]
      // },
      // {
      //           id: 'manage-clients',
      //           title: 'Manage Clients',
      //           type: 'collapsible',
      //           icon: 'smile',
      //           isforTenant:true,
      //           moduleName:"Pages.Clients",
      //           children: [
      //             {
      //               id: 'clients',
      //               title: 'Client/Customers',
      //               type: 'item',
      //               icon: 'circle',
      //               url: 'apps/customer/list'
      //             },
      //             {
      //               id: 'service-contract-types',
      //               title: 'Service Contract Types',
      //               type: 'item',
      //               icon: 'circle',
      //               url: 'apps/servicecontracttypes/list'
      //             },
      //            ]
      // },
      // {
      //   id: 'manage-job',
      //   title: 'Manage Jobs',
      //   type: 'collapsible',
      //   icon: 'tool',
      //   isforTenant:true,
      //   moduleName:"Pages.Jobs",
      //   children: [
      //     {
      //       id: 'jobs',
      //       title: 'Manage Jobs',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/job/list'
      //     },
      //     {
      //       id: 'job-type',
      //       title: 'Job Types',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/job/jobtype/list'
      //     },
      //     {
      //       id: 'job-checklist',
      //       title: 'Job Check List',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/job/checklist/list'
      //     },
      //    ]
      // },
      // {
      //                 id: 'manage-dispatch',
      //                 title: 'Job Dispatch',
      //                 type: 'collapsible',
      //                 icon: 'compass',
      //                 isforTenant:true,
      //                 moduleName:"Pages.Dispatch",
      //                 children: [
      //                   {
      //                     id: 'job-dispatch',
      //                     title: 'Dispatch',
      //                     type: 'item',
      //                     icon: 'circle',
      //                     url: 'apps/dispatch/list'
      //                   },
                        
      //                  ]
      // },
      // {
      //                   id: 'manage-schedule',
      //                   title: 'Job Schedule',
      //                   type: 'collapsible',
      //                   icon: 'calendar',
      //                   isforTenant:true,
      //                   moduleName:"Pages.Schedule",
      //                   children: [
      //                     {
      //                       id: 'job-schedule',
      //                       title: 'Schedule',
      //                       type: 'item',
      //                       icon: 'circle',
      //                       url: 'apps/schedule/list'
      //                     },
                          
      //                    ]
      // },
      //  {
      //   id: 'ManageUsers',
      //   title: 'Manage Users',
      //   type: 'item',
      //   icon: 'users',
      //   url: 'apps/user/user-list',
      //   isforTenant:true,
      //   moduleName:"Pages.Users",
      // },
      // {
      //   id: 'ManageRoles',
      //   title: 'Manage Roles',
      //   type: 'item',
      //   icon: 'server',
      //   url: 'apps/role/list',
      //   isforTenant:true,
      //   moduleName:"Pages.Roles",
      // },   
      // {
      //   id: 'ProfileSettings',
      //   title: 'Settings',
      //   type: 'item',
      //   icon: 'settings',
      //   url: 'apps/profile/list',
      //   isforTenant:true,
      //   moduleName:"Pages.Settings"
      // },  

  //menus for super admin Portal


      {
        id: 'analytics',
        title: 'Super Dashboard',
        type: 'item',       
        icon: 'home',
        url: 'dashboard/analytics',
        isforTenant:false,
        moduleName:"Pages.Dashboard",
      },
      
      {
        id: 'manage-customers-tenants',
        title: 'Manage Customers',
        type: 'collapsible',
        icon: 'server',
        isforTenant:false,
        moduleName:"Pages.Tenants",
        children: [
          {
            id: 'Tenants',
            title: 'Manage Tanants',
            type: 'item',
            icon: 'circle',
            url: 'apps/tenants/tenant-list',
           
          },
          {
            id: 'subscription-reports',
            title: 'Subscription Reports',
            type: 'item',
            icon: 'circle',
            url: 'apps/subscriptionreports/list',
            
          },
          {
            id: 'usage-details',
            title: 'Usage Details',
            type: 'item',
            icon: 'circle',
            url: 'apps/usagedetails/list'
          },
          {
            id: 'sla-agreement',
            title: 'SLAs/Agreement Logs',
            type: 'item',
            icon: 'circle',
            url: 'apps/agreementlogs/types'
          },
        ]
      },
      {
        id: 'website-configuration',
        title: 'Manage WebSite',
        type: 'collapsible',
        icon: 'server',
        isforTenant:false,
        moduleName:"Pages.Tenants",
        children: [
          {
            id: 'Silder',
            title: 'Manage Slider',
            type: 'item',
            icon: 'circle',
            url: 'apps/slider/add',
           
          },
          {
            id: 'Services',
            title: 'Manage Services',
            type: 'item',
            icon: 'circle',
            url: 'apps/services/list',
            
          },     
             {
            id: 'blog',
            title: 'Manage Blogs',
            type: 'item',
            icon: 'circle',
            url: 'apps/blog',
            
          }
          // {
          //   id: 'usage-details',
          //   title: 'Usage Details',
          //   type: 'item',
          //   icon: 'circle',
          //   url: 'apps/usagedetails/list'
          // },
          // {
          //   id: 'sla-agreement',
          //   title: 'SLAs/Agreement Logs',
          //   type: 'item',
          //   icon: 'circle',
          //   url: 'apps/agreementlogs/types'
          // },
        ]
      },
      {
        id: 'ManageIndustries',
        title: 'Manage Industry',
        type: 'item',
        icon: 'sliders',
        url: 'apps/industry/list',
        isforTenant:false,
        moduleName:"Pages.Industry",
      },
      {
        id: 'Packages',
        title: 'Subscription Templates',
        type: 'item',
        icon: 'package',
        url: 'apps/packages/list',
        isforTenant:false,
        moduleName:"Pages.Package",
      },
      {
        id: 'ManageUsers',
        title: 'Manage Users',
        type: 'item',
        icon: 'users',
        url: 'apps/user/user-list',
        isforTenant:false,
        moduleName:"Pages.Users",
      },
      {
        id: 'ManageRoles',
        title: 'Manage Roles',
        type: 'item',
        icon: 'server',
        url: 'apps/role/list',
        isforTenant:false,
        moduleName:"Pages.Roles",
      },
    
      {
        id: 'SuperAdminSettings',
        title: 'Settings',
        type: 'collapsible',
        icon: 'settings',
        isforTenant:false,
        moduleName:"Pages.Settings",
        children: [
          {
            id: 'ProfileSettings',
            title: 'Settings',
            type: 'item',
            icon: 'circle',
            url: 'apps/profile/list',
          },
          {
            id: 'manage-privacy-policy',
            title: 'Manage Privacy Policy',
            type: 'item',
            icon: 'circle',
            url: 'apps/privacypolicy/list'
          },
          {
            id: 'manage-terms-conditions',
            title: 'Terms and Conditions',
            type: 'item',
            icon: 'circle',
            url: 'apps/termsconditions/types'
          },
          {
            id: 'notification-settings',
            title: 'Notification Settings',
            type: 'item',
            icon: 'circle',
            url: 'apps/notificationsettings/list'
          },
          {
            id: 'email-templates',
            title: 'Email Template',
            type: 'item',
            icon: 'circle',
            url: 'apps/emailtemplates/list'
          },
        ]
        },
    ]
  }
];
