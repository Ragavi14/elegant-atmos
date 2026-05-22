import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* =========================
   DASHBOARD
========================= */
export default function AdminDashboard({ onLogout }) {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedLeadId(id);
    setShowDeleteModal(true);
  };

  /* =========================
     FETCH LEADS
  ========================= */
  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* =========================
     DELETE LEAD
  ========================= */
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/leads/${selectedLeadId}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (data.success) {
        setLeads(leads.filter(lead => lead.id !== selectedLeadId));
        setShowDeleteModal(false);
        setSelectedLeadId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* GLOBAL FONTS, CSS RESET AND CSS VARIABLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        :root {
          --green: #5F733C;
          --green-dark: #3d4f27;
          --green-light: #8fa86a;
          --bg-light: #f7f5ef;
          --text-dark: #1a1a1a;
          --text-muted: #6b7553;
          --danger: #dc2626;
        }

        .dashboard-wrapper {
          width: 100%;
          min-height: 100vh;
          display: flex;
          background-color: var(--bg-light);
          font-family: 'Poppins', sans-serif;
        }

        .dashboard-sidebar {
          width: 15%;
          background-color: var(--green);
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .sidebar-logo {
          height: '80px';
        }

        .sidebar-branding {
          color: #fff;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .menu-active {
          background-color: var(--green-dark);
          color: #fff;
          padding: 14px;
          borderRadius: 10px;
          font-weight: 600;
          margin-bottom: auto; /* Pushes the logout button to the bottom */
        }

        .logout-btn {
          width: 100%;
          padding: 14px;
          background-color: var(--text-dark);
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          transition: opacity 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .logout-btn:hover { opacity: 0.9; }

        .dashboard-workspace {
          width: 85%;
          flex-grow: 1;
          padding: 40px;
          overflow-x: auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .page-title {
          font-size: 32px;
          color: var(--text-dark);
          margin: 0;
        }

        .badge-count {
          background-color: var(--green-light);
          color: #fff;
          padding: 10px 18px;
          border-radius: 999px;
          font-weight: 700;
        }

        .table-wrapper {
          background-color: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.05);
        }

        .leads-table {
          width: 100%;
          border-collapse: collapse;
        }

        .leads-table th {
          background-color: var(--green);
          color: #fff;
          padding: 18px;
          text-align: left;
          font-size: 14px;
        }

        .leads-table td {
          padding: 18px;
          border-bottom: 1px solid #edf1e7;
          color: var(--text-dark);
          font-size: 14px;
          vertical-align: top;
        }

        .loading-text {
          color: var(--text-muted);
          font-size: 18px;
        }

        .delete-btn {
          background-color: var(--danger);
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999999;
        }

        .modal-box {
          width: 420px;
          background-color: #fff;
          border-radius: 14px;
          padding: 30px;
          box-sizing: border-box;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .modal-title {
          margin: 0 0 14px 0;
          font-size: 24px;
          color: var(--text-dark);
          font-weight: 700;
        }

        .modal-text {
          margin: 0 0 25px 0;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .cancel-btn {
          padding: 10px 18px;
          border: 1px solid #d1d5db;
          background-color: #fff;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .confirm-delete-btn {
          padding: 10px 18px;
          background-color: var(--danger);
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>

      {/* DASHBOARD HTML RENDER */}
      <div className="dashboard-wrapper">
        
        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-branding">
            <img alt="Elegant Atmos" src="https://kevnitserver.com/projects/elegant_builders/elegantatmoslogo.png" style={{ height: '80px' }}/>
          </div>

          <div className="menu-active">
            Customer Leads
          </div>

          <button
            onClick={() => {
              onLogout();
              navigate('/admin');
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </aside>

        {/* MAIN WORKSPACE */}
        <main className="dashboard-workspace">
          <div className="page-header">
            <h1 className="page-title">Customer Leads</h1>
            <div className="badge-count">{leads.length} Total</div>
          </div>

          {loading ? (
            <div className="loading-text">Loading Leads...</div>
          ) : (
            <div className="table-wrapper">
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Form Type</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.full_name}</td>
                      <td>{lead.phone}</td>
                      <td>{lead.email}</td>
                      <td>{lead.message || '-'}</td>
                      <td>{lead.form_type || '-'}</td>
                      <td>{new Date(lead.created_at).toLocaleString()}</td>
                      <td>
                        <button
                          onClick={() => openDeleteModal(lead.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {/* CONFIRMATION MODAL */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3 className="modal-title">Delete Lead</h3>
              <p className="modal-text">
                Are you sure you want to permanently delete this lead?
              </p>
              <div className="modal-actions">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="confirm-delete-btn"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}