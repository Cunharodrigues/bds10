import Pagination from 'components/Pagination';
import EmployeeCard from 'components/EmployeeCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { Employee } from 'types/employee';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { hasAnyRoles } from 'util/auth';

import './styles.css';

const List = () => {

  const [page, setPage] = useState<SpringPage<Employee>>();

  const handlePageChange = (pageNumber: number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/employees`,
      withCredentials: true,
      params: {
        page: pageNumber,
        size: 4,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  };

  useEffect(() => {
    handlePageChange(0);
  }, []);

  return (
    <>
      <Link to="/admin/employees/create">
        {hasAnyRoles(['ROLE_ADMIN']) && (
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        )}
      </Link>
      {page?.content.map((employee) => (
        <EmployeeCard employee={employee} key={employee.id} />
      ))}
      <Pagination
        forcePage={0}
        pageCount={page ? page?.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
