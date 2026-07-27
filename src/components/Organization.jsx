import React from 'react';
import { User } from 'lucide-react';
import './OrganizationTree.css';

const buildTree = (members) => {
  const rootNodes = [];
  const memberMap = {};

  members.forEach(member => {
    memberMap[member.id] = { ...member, children: [] };
  });

  members.forEach(member => {
    if (member.parentId) {
      const parentIds = member.parentId.toString().split(',').map(id => id.trim()).filter(id => id);
      let hasValidParent = false;

      parentIds.forEach(pId => {
        if (memberMap[pId]) {
          memberMap[pId].children.push(memberMap[member.id]);
          hasValidParent = true;
        }
      });

      if (!hasValidParent) {
        rootNodes.push(memberMap[member.id]);
      }
    } else {
      rootNodes.push(memberMap[member.id]);
    }
  });

  return rootNodes;
};

const OrgNode = ({ node }) => {
  return (
    <li>
      <div className="org-node" id={`org-node-${node.id}`}>
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

const Organization = ({ data, title }) => {
  const orgData = Array.isArray(data) ? data : [];
  const tree = buildTree(orgData);

  return (
    <div className="section container">
      {title && (
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">{title}</h2>
        </div>
      )}
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
  );
};

export default Organization;
