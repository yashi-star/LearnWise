# Redux Removal Instructions

This project is being transitioned away from Redux to use NextAuth and direct API calls. The following steps outline the process for removing Redux dependencies from components:

## What Has Been Done So Far

1. Removed Redux Provider from `app/providers.tsx`
2. Updated auth hooks to use NextAuth session instead of Redux:
   - `app/hooks/userAuth.tsx`
   - `app/hooks/adminProtected.tsx`
3. Updated authentication components to use NextAuth:
   - `app/components/Auth/Verification.tsx`
   - `app/components/Admin/sidebar/AdminSidebar.tsx`
   - `app/components/Course/CourseDetails.tsx`
4. Created a placeholder file at `app/redux-placeholder.ts` to temporarily replace Redux functionality
5. Updated additional components to use the placeholder or direct API calls:
   - `app/courses/page.tsx`
   - `app/components/Profile/ChangePassword.tsx`
   - `app/components/Profile/ProfileInfo.tsx`
   - `app/components/Course/CourseContent.tsx`

## What Needs To Be Done

For each component that still uses Redux, you need to:

1. Update imports to use the placeholder or direct API calls
2. Update component logic to handle the new data structure
3. Eventually implement proper API calls to replace Redux queries

### Example of Updating a Component

Original Redux implementation:

```tsx
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

const Component = () => {
  const { data, isLoading } = useGetAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  // ...
};
```

Updated implementation using placeholder:

```tsx
import {
  useGetAllCoursesQuery,
  useGetHeroDataQuery,
} from "@/app/redux-placeholder";

const Component = () => {
  const { data, isLoading } = useGetAllCoursesQuery();
  const { data: categoriesData } = useGetHeroDataQuery();
  // Make sure to add null checks, e.g.,
  const categories = categoriesData?.layout?.categories || [];
  // ...
};
```

### Example of Using Direct API Calls

For components that need real data and can't use placeholders:

```tsx
const [loading, setLoading] = useState(true);
const [data, setData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/endpoint");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
```

### Components That Need Updating

The following components still use Redux:

1. `app/components/Course/CourseDetailsPage.tsx`
2. `app/components/Course/CourseContentMedia.tsx`
3. `app/components/Payment/CheckOutForm.tsx`
4. `app/components/Admin/Order/AllInvoices.tsx`
5. `app/components/Admin/Course/AllCourses.tsx`
6. `app/components/Admin/Course/EditCourse.tsx`
7. `app/components/Admin/Course/CreateCourse.tsx`
8. `app/components/Admin/Course/CourseInformation.tsx`
9. `app/components/Admin/Customization/EditHero.tsx`
10. `app/components/Admin/Customization/EditFaq.tsx`
11. `app/components/Admin/Customization/EditCategories.tsx`
12. `app/components/Admin/Users/AllUsers.tsx`
13. `app/components/Admin/DashboardHeader.tsx`
14. `app/components/Admin/Widgets/DashboardWidgets.tsx`
15. `app/components/Admin/Analytics/CourseAnalytics.tsx`
16. `app/components/Admin/Analytics/OrdersAnalytics.tsx`
17. `app/components/Admin/Analytics/UserAnalytics.tsx`
18. `app/course-access/[id]/page.tsx`

## Final Steps

Once all components have been updated:

1. Implement proper API service functions to replace the Redux queries
2. Remove the placeholder file
3. Ensure all functionality works correctly with direct API calls
4. Run tests to verify everything is working as expected
