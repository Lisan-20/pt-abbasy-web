import React from 'react';
import { User } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import '../components/OrganizationTree.css';

const buildTree = (members) => {
  const rootNodes = [];
  const memberMap = {};

  // Peta semua anggota berdasarkan ID
  members.forEach(member => {
    memberMap[member.id] = { ...member, children: [] };
  });

  // Susun relasi anak dan induk
  members.forEach(member => {
    if (member.parentId && memberMap[member.parentId]) {
      memberMap[member.parentId].children.push(memberMap[member.id]);
    } else {
      rootNodes.push(memberMap[member.id]);
    }
  });

  return rootNodes;
};

const OrgNode = ({ node }) => {
  return (
    <li>
      <div className="org-node">
        {node.photo ? (
          <img src={node.photo} alt={node.name} className="org-photo" />
        ) : (
          <div className="org-photo-placeholder">
            <User size={32} />
          </div>
        )}
        <div className="org-name">{node.name}</div>
        <div className="org-role">{node.role}</div>
      </div>
      
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map(child => (
            <OrgNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const OrganizationPage = ({ data }) => {
  // Tangani apakah data dikirim sebagai array atau objek
  const orgData = Array.isArray(data) ? data : (data?.organization || []);
  const tree = buildTree(orgData);

  return (
    <PageWrapper title="Struktur Organisasi">
      <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '140px 0 60px', textAlign: 'center' }}>
        <h1 style={{ color: 'white' }}>Struktur Organisasi</h1>
        <p style={{ marginTop: '10px' }}>(Office)</p>
      </div>
      
      <div className="section container">
        <div className="org-tree">
          <div className="tree">
            <ul>
              {tree.map(rootNode => (
                <OrgNode key={rootNode.id} node={rootNode} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrganizationPage;
